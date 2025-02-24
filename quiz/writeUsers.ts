import { promises as fsPromises } from 'fs';
import path from 'path';
import express, { Request, Response } from 'express';
import { User } from './types'; // Import User type

const router = express.Router();
const dataFile = path.resolve(__dirname, '../data/users.json');

/**
 * Loads user data from the JSON file.
 * @returns {Promise<User[]>} List of users.
 */
async function loadUsers(): Promise<User[]> {
  try {
    const data = await fsPromises.readFile(dataFile, 'utf-8');
    return JSON.parse(data) as User[];
  } catch (err) {
    console.error('Error reading user data file:', err);
    return [];
  }
}

/**
 * Saves user data to the JSON file.
 * @param {User[]} users - The list of users to save.
 */
async function saveUsers(users: User[]): Promise<void> {
  try {
    await fsPromises.writeFile(dataFile, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing to user data file:', err);
  }
}

/**
 * POST /write/adduser - Add a new user
 * @param {User} newUser - The user object received from the request body.
 * @returns A success message or error if saving fails.
 */
router.post('/adduser', async (req: Request, res: Response) => {
  try {
    const users = await loadUsers();
    const newUser: User = req.body;

    // Validate user input
    if (!newUser.username || !newUser.email || !newUser.id) {
      return res.status(400).json({ error: 'Invalid user data. Required: id, username, email' });
    }

    // Check if the user already exists
    if (users.some((user) => user.username === newUser.username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    users.push(newUser);
    await saveUsers(users);

    console.log('User added successfully.');
    res.json({ message: 'User added successfully' });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ error: 'Error saving user' });
  }
});

export default router;
