import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

// Middleware that is specific to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now());
  next();
});

// Define the home page route
router.get('/', (req: Request, res: Response) => {
  res.send('Birds home page');
});

// Define the about route
router.get('/about', (req: Request, res: Response) => {
  res.send('About birds');
});

export default router;
