require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const limiter = require('./middlewares/limit');
const nonExistRoute = require('./routes/nonExist');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/centralizeError');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb');

const app = express();

const allowedOrigins = [
  'https://yaron-amir.students.nomoredomainssbs.ru',
  'http://api.yaron-amir.students.nomoredomainssbs.ru',
  'http://localhost:3000',
];
app.use(cors(allowedOrigins));
app.use(requestLogger);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(limiter);

app.use(userRouter);
app.use('/cards', cardRouter);
app.use('*', nonExistRoute);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
