const router = require('express').Router();

const {
  createMovie,
  deleteMovie,
  getMovie,
} = require('../controllers/movies');

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/fieldsValidation');

router.get('/', getMovie); // возвращает все сохранённые текущим  пользователем фильмы
router.post('/', createMovieValidation, createMovie); // создаёт фильм с переданными в теле запроса данными
router.delete('/:movieId', deleteMovieValidation, deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
