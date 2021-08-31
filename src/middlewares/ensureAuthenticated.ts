import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Missing API Key', 401);
  }

  const [, token] = authHeader.split(' ');

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new AppError('Missing setting', 501);
  }

  try {
    if (token === apiKey) {
      return next();
    } else {
      throw new error();
    }
  } catch {
    throw new AppError('Invalid Token', 401);
  }
}
