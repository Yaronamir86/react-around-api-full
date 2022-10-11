const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/centralizeError');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb');

require('dotenv').config();

// const nonExistRoute = require('./routes/nonExist');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(helmet());
app.use(auth);
app.use(requestLogger);
app.use(router);
// app.use('*', nonExistRoute);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
