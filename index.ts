import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import todoRouter from './routes/todos';

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  console.log('53test')
  res.send('Express + TypeScript Server');
});

app.use('/todos', todoRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});