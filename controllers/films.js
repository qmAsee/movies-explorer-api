const filmModel = require('../models/film');

const {
  OK,
  CREATED,
} = require('../utils/responses');

const NotFound = require('../utils/errorClasses/ErrorNotFound');
const BadRequest = require('../utils/errorClasses/ErrorBadRequest');
const Forbidden = require('../utils/errorClasses/ErrorForbidden');

const createFilm = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    filmId,
    nameRU,
    nameEN,
  } = req.body;

  filmModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      filmId,
      nameRU,
      nameEN,
    })
    .then((film) => res.status(CREATED).send(film))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы неправильные данные'));
      } else {
        next(err);
      }
    });
};

const deleteFilm = (req, res, next) => {
  filmModel
    .findById(req.params.filmId)
    .orFail(() => {
      throw new NotFound('Фильм с укказанным id не найден');
    })
    .then((film) => {
      const owner = film.owner.toString();
      if (req.user._id === owner) {
        filmModel
          .deleteOne(film)
          .then(() => {
            res.status(OK).send(film);
          })
          .catch(next);
      } else {
        throw new Forbidden('Вы не можете удалять фильмы других пользователей');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Мы не можем найти фильм по указанным данным'));
      } else {
        next(err);
      }
    });
};

const getFilms = (req, res, next) => {
  filmModel
    .find({ owner: req.user._id })
    .then((films) => {
      res.send(films);
    })
    .catch(next);
};

module.exports = {
  createFilm,
  deleteFilm,
  getFilms,
};
