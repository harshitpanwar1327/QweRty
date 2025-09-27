import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or malformed!' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = await admin.auth().verifyIdToken(token);
    
    (req as any).user = decoded;

    next();
  } catch (error: any) {
    console.error('Auth error:', error);

    if (error.code === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired!', code: 'TOKEN_EXPIRED' });
    }

    return res.status(401).json({ message: 'Invalid token!', code: 'TOKEN_INVALID' });
  }
};