import { Request } from 'express';

// define relevant types here

/**
 * Represents a user object structure.
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

/**
 * Extends Express Request to include users data.
 */
export interface UserRequest extends Request {
  users?: User[];
}
