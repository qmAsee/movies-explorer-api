const { celebrate, Joi } = require('celebrate');

const linkRegExp = /https?:\/\/(\w{3}\.)?[1-9a-z\-.]{1,}\w\w(\/[1-90a-z.,_@%&?+=~/-]{1,}\/?)?#?/i;

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

const findUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const createFilmValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(linkRegExp),
    trailerLink: Joi.string().required().regex(linkRegExp),
    thumbnail: Joi.string().required().regex(linkRegExp),
    filmId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteFilmValidation = celebrate({
  params: Joi.object().keys({
    filmId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  signinValidation,
  signupValidation,
  updateUserValidation,
  findUserByIdValidation,
  createFilmValidation,
  deleteFilmValidation,
};
