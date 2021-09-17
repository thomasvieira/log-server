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
  } finally {
    await client.close();
  }
  return response.json({
    Mensagem: 'LogSalvo',
  });
});

logRouter.get('/', async (request, response) => {
  const { from } = request.query;
  let resultado;
  let logCollection;

  const client = await connection();

  try {
    logCollection = client.db('logserver').collection('logs');
    resultado = await logCollection
      .find({ createdAt: { $gt: new Date('2021-09-16T12:00:00.000-03:00') } })
      .sort({ createdAt: 1 })
      .toArray();
  } finally {
    //await client.close();
  }

  var pagina = `<html>
      <head>Log Server</head>
      <body>
        <h1>
          Lista de Logs
        </h1>
        <ul>
        `;
  resultado.forEach(log => {
    pagina = pagina + `<li>${JSON.stringify(log)}</li>`;
  });

  pagina =
    pagina +
    `
        </ul>
      </body>
    </html>`;

  return response.send(pagina);
});

export default logRouter;
