import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import contactsRouter from './routers/contactsRouter.js';
import authRouter from './routers/auth.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  })
);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Contacts API!',
    status: 'API is running successfully.',
    documentation:
      'Please refer to the project documentation for available endpoints.',
  });
});

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
