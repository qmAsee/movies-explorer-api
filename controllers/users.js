const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const BadRequest = require('../utils/errorClasses/ErrorBadRequest');
const Conflict = require('../utils/errorClasses/ErrorConflict');
const NotFound = require('../utils/errorClasses/ErrorNotFound');
const Unauthorized = require('../utils/errorClasses/ErrorUnauthorized');

const { JWT_SECRET, STATUS } = process.env;

const {
  OK,
  CREATED,
} = require('../utils/responses');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      if (!user) {
        return next(new NotFound('Не удается создать пользователя'));
      }

      return res.status(CREATED).send(
        {
          data: {
            name: user.name,
            email: user.email,
          },
        },
      );
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введены некорректные данные'));
        return;
      }
      if (err.code === 11000) {
        next(new Conflict('Пользователь с введенным email уже зарегистрирован'));
        return;
      }
      next(err);
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  userModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new Unauthorized('Почта или пароль неверны'));
        return;
      }
      /* eslint consistent-return: off */
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new Unauthorized('Почта или пароль неверны');
          } else {
            const token = jwt.sign(
              { _id: user._id },
              STATUS === 'production' ? JWT_SECRET : 'some-secret-key',
              { expiresIn: '7d' },
            );
            res.status(OK).send({ token });
          }
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  userModel
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь по указанному id не найден');
      }
      res.status(OK).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь по указанному id не найден'));
        return;
      }
      res.status(OK).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введены некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
