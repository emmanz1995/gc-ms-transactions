import express, { Request, Response, Application } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongoSetup } from './mongo/setup';
import institutionRouter from './api/institutions/router';
import { ErrorHandler } from './middleware';

dotenv.config();
const app: Application = express();

mongoSetup();

const origins: object = {
  url: 'http://localhost:8082',
};

app.use(cors(origins));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to institutions service</h1>');
});

app.use('/api/v1/institutions', institutionRouter);
// @ts-ignore
app.use(ErrorHandler);

const { PORT } = process.env;

app.listen(PORT ?? 8082, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
