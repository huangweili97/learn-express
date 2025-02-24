// import fs from 'fs';
// import path from 'path';
// import express, { Express, Request, Response, NextFunction } from 'express';
// import cors from 'cors';

// const app = express();
// const port = 8000;
// const dataFile = '../data/users.json';


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

import express, { Express } from 'express';
import cors from 'cors';
import readUsers from './readUsers';  // Import user read operations
import writeUsers from './writeUsers'; // Import user write operations

const app: Express = express();
const port: number = 8000;

// Enable CORS for frontend requests
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the modular routes
app.use('/read', readUsers);
app.use('/write', writeUsers);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
