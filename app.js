require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const router = require('./routers/index');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors());
app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(requestLogger);
app.use(errorLogger);

app.use(router);

app.use(errors());
app.use(errorHandler);

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1/moviesdb',
} = process.env;
mongoose.connect(MONGO_URL);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
