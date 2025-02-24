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
 * GET /read/usernames - Fetch all usernames
 * @returns A list of user IDs and usernames.
 */
router.get('/usernames', async (req: Request, res: Response) => {
  const users = await loadUsers();
  if (users.length === 0) {
    return res.status(404).json({ error: 'No users found' });
  }

  const usernames = users.map((user) => ({ id: user.id, username: user.username }));
  res.json(usernames);
});

/**
 * GET /read/username/:name - Fetch user email by username
 * @param {string} name - The username to search for.
 * @returns The email of the user or a 404 error if not found.
 */
router.get('/username/:name', async (req: Request, res: Response) => {
  const users = await loadUsers();
  const user = users.find((u) => u.username === req.params.name);

  if (user) {
    res.json({ email: user.email });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

export default router;
