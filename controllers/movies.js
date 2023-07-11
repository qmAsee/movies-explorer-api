const movieModel = require('../models/movie');

const {
  OK,
  CREATED,
} = require('../utils/responses');

const NotFound = require('../utils/errorClasses/ErrorNotFound');
const BadRequest = require('../utils/errorClasses/ErrorBadRequest');
const Forbidden = require('../utils/errorClasses/ErrorForbidden');

const {
  NOT_VALID_DATA,
  MOVIE_ID_NOT_FOUND,
  MOVIE_DELETE_FORBIDDEN,
  WRONG_MOVIE_DATA,
} = require('../utils/errors');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  movieModel
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
      movieId,
      nameRU,
      nameEN,
    })
    .then((film) => res.status(CREATED).send(film))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(NOT_VALID_DATA));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  movieModel
    .findById(req.params.movieId)
    .orFail(() => {
      throw new NotFound(MOVIE_ID_NOT_FOUND);
    })
    .then((film) => {
      const owner = film.owner.toString();
      if (req.user._id === owner) {
        movieModel
          .deleteOne(film)
          .then(() => {
            res.status(OK).send(film);
          })
          .catch(next);
      } else {
        throw new Forbidden(MOVIE_DELETE_FORBIDDEN);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(WRONG_MOVIE_DATA));
      } else {
        next(err);
      }
    });
};

const getMovie = (req, res, next) => {
  movieModel
    .find({ owner: req.user._id })
    .then((films) => {
      res.send(films);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
};
