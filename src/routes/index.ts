// src/routes/index.ts
import { Router } from 'express';

import logRouter from './log.routes';

const routes: Router = Router();

routes.use('/log', logRouter);

export default routes;
