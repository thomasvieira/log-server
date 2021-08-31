/* eslint-disable no-console */
import 'reflect-metadata';
import './config/dotenv';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import fileUpload from 'express-fileupload';

import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);
    return response.status(500).json(err);
  },
);

console.log('Rocket Launched');
console.log('Server running on port ', process.env.PORT || 3333);
app.listen(process.env.PORT || 3333);
//inicializaServicos();
