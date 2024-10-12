import express, { Request, Response, Application } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongoSetup } from './mongo/setup';

dotenv.config();
const app: Application = express();

mongoSetup();

const origins: object = {
  url: 'http://localhost:8082',
};

app.use(cors(origins));

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to institutions service</h1>');
});

const { PORT } = process.env;

app.listen(PORT ?? 8082, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
