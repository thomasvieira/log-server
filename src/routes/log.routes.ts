/* eslint-disable camelcase */
import { Router } from 'express';
import { connection } from '../database/index';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const logRouter: Router = Router();

logRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { level, message } = request.body;

  const client = await connection();

  try {
    const logCollection = client.db('logserver').collection('logs');

    await logCollection.insertOne({
      level: level,
      message: message,
      createdAt: new Date(),
    });

    // console.log({ level, message });
  } finally {
    await client.close();
  }
  return response.json({
    Mensagem: 'LogSalvo',
  });
});

export default logRouter;
