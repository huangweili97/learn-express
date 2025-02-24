import { promises as fsPromises } from 'fs';
import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

/**
 * Represents a user object structure.
 */
interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

/**
 * Extends Express Request to include users data.
 */
interface UserRequest extends Request {
  users?: User[];
}

// Create an Express application instance
const app: Express = express();
const port: number = 8000;

// Define the path to the users data file
const dataFile = path.resolve(__dirname, '../data/users.json');

let users: User[] = [];

/**
 * Reads the user data from the file and loads it into memory.
 */
async function readUsersFile() {
  try {
    console.log('Reading user data file...');
    const data = await fsPromises.readFile(dataFile, 'utf-8');
    users = JSON.parse(data);
    console.log('User data file loaded successfully.');
  } catch (err) {
    console.error('Error reading user data file:', err);
    throw err;
  }
}

// Load user data on server startup
readUsersFile();

/**
 * Middleware that attaches users data to the request object.
 */
const attachUsersToRequest = (req: UserRequest, res: Response, next: NextFunction) => {
  if (users.length > 0) {
    req.users = users;
    next();
  } else {
    res.status(404).json({ error: { message: 'Users not found', status: 404 } });
  }
};

// Enable CORS for frontend requests
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Attach middleware to requests that require user data
app.use('/read/usernames', attachUsersToRequest);
app.use('/read/username', attachUsersToRequest);
app.use('/write/adduser', attachUsersToRequest);

/**
 * Route: Fetch all usernames.
 * @returns A list of user IDs and usernames.
 */
app.get('/read/usernames', (req: UserRequest, res: Response) => {
  const usernames = req.users?.map(user => ({ id: user.id, username: user.username }));
  res.json(usernames);
});

/**
 * Route: Fetch user email by username.
 * @param {string} name - The username to search for.
 * @returns The email of the user or a 404 error if not found.
 */
app.get('/read/username/:name', (req: UserRequest, res: Response) => {
  const username = req.params.name;
  const user = req.users?.find(u => u.username === username);

  if (user) {
    res.json({ email: user.email });
  } else {
    res.status(404).json({ error: { message: 'User not found', status: 404 } });
  }
});

/**
 * Route: Add a new user to the user list and save to file.
 * @param {User} newuser - The user object received from the request body.
 * @returns A success message or error if saving fails.
 */
app.post('/write/adduser', async (req: UserRequest, res: Response) => {
  try {
    const newuser = req.body as User;

    // Validate user input
    if (!newuser.username || !newuser.email) {
      return res.status(400).json({ error: 'Invalid user data' });
    }

    users.push(newuser);

    await fsPromises.writeFile(dataFile, JSON.stringify(users, null, 2));

    console.log('User added successfully.');
    res.json({ message: 'User added successfully' });
  } catch (err) {
    console.error('Error writing to user data file:', err);
    res.status(500).json({ error: 'Error saving user' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
