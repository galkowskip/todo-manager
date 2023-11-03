import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors"

import './db'

dotenv.config();

import todoRouter from './routes/todos';


const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use((req, _, next) => {
  console.log('Origin: ', req.headers.origin);
  console.log('Method: ', req.method);
  next();
});


app.get('/', (req: Request, res: Response) => {
  console.log('GET /');
  res.send('Express + TypeScript Server');
});

app.use('/todos', todoRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});