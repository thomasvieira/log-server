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
  const { level, age, contains } = request.query;
  let resultado;
  let logCollection;
  let levelCondition;
  let ageInMilliseconds;
  let ageCondition;
  let containsCondition;

  switch (level) {
    case 'justwarn':
      levelCondition = 'warn';
      break;
    case 'justinfo':
      levelCondition = 'info';
      break;
    case 'justverbose':
      levelCondition = 'verbose';
      break;
    case 'justdebug':
      levelCondition = 'debug';
      break;
    case 'justerror':
    case 'error':
      levelCondition = 'error';
      break;
    case 'warn':
      levelCondition = { $in: ['error', 'warn'] };
      break;
    case 'info':
      levelCondition = { $in: ['error', 'warn', 'info'] };
      break;
    case 'verbose':
      levelCondition = { $in: ['error', 'warn', 'info', 'verbose'] };
      break;
    case 'debug':
    default:
      levelCondition = { $in: ['error', 'warn', 'info', 'verbose', 'debug'] };
  }

  if (typeof age === 'string') {
    ageInMilliseconds = parseInt(age, 10) * 60 * 60 * 1000; // horas * minutos * segundos * milisegundos
  } else {
    ageInMilliseconds = 24 * 60 * 60 * 1000; // horas * minutos * segundos * milisegundos
  }
  ageCondition = Date.now() - ageInMilliseconds;

  const regex = `^.*${contains}.*$`;

  if (!contains) {
    containsCondition = { $regex: `^(?!\s*$).+` };
  } else {
    containsCondition = { $regex: regex };
  }

  const client = await connection();

  try {
    logCollection = client.db('logserver').collection('logs');
    resultado = await logCollection
      .find({
        level: levelCondition,
        createdAt: { $gt: new Date(ageCondition) },
        message: containsCondition,
      })
      .sort({ createdAt: 1 })
      .toArray();
  } finally {
    //await client.close();
  }

  var pagina = `<html>
      <head>
        <title>Log Server</title>
      </head>
      <body>
        <h1>
          Lista de Logs
        </h1>
        <h3>
          Filtros: level, age, contains
        </h3>
        <h4>
          Ex.: http://localhost:3333/log?level=info&age=24&contains=Data
        </h4>
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

logRouter.get('/json', async (request, response) => {
  const { level, age, contains } = request.query;
  let resultado;
  let logCollection;
  let levelCondition;
  let ageInMilliseconds;
  let ageCondition;
  let containsCondition;

  switch (level) {
    case 'justwarn':
      levelCondition = 'warn';
      break;
    case 'justinfo':
      levelCondition = 'info';
      break;
    case 'justverbose':
      levelCondition = 'verbose';
      break;
    case 'justdebug':
      levelCondition = 'debug';
      break;
    case 'justerror':
    case 'error':
      levelCondition = 'error';
      break;
    case 'warn':
      levelCondition = { $in: ['error', 'warn'] };
      break;
    case 'info':
      levelCondition = { $in: ['error', 'warn', 'info'] };
      break;
    case 'verbose':
      levelCondition = { $in: ['error', 'warn', 'info', 'verbose'] };
      break;
    case 'debug':
    default:
      levelCondition = { $in: ['error', 'warn', 'info', 'verbose', 'debug'] };
  }

  if (typeof age === 'string') {
    ageInMilliseconds = parseInt(age, 10) * 60 * 60 * 1000; // horas * minutos * segundos * milisegundos
  } else {
    ageInMilliseconds = 24 * 60 * 60 * 1000; // horas * minutos * segundos * milisegundos
  }
  ageCondition = Date.now() - ageInMilliseconds;

  const regex = `^.*${contains}.*$`;

  if (!contains) {
    containsCondition = { $regex: `^(?!\s*$).+` };
  } else {
    containsCondition = { $regex: regex };
  }

  const client = await connection();

  try {
    logCollection = client.db('logserver').collection('logs');
    resultado = await logCollection
      .find({
        level: levelCondition,
        createdAt: { $gt: new Date(ageCondition) },
        message: containsCondition,
      })
      .sort({ createdAt: 1 })
      .toArray();
  } finally {
    //await client.close();
  }

  return response.json(resultado);
});

export default logRouter;
