const router = require('express').Router();

const {
  createFilm,
  deleteFilm,
  getFilms,
} = require('../controllers/films');

const {
  createFilmValidation,
  deleteFilmValidation,
} = require('../middlewares/fieldsValidation');

router.get('/', getFilms); // возвращает все сохранённые текущим  пользователем фильмы
router.post('/', createFilmValidation, createFilm); // создаёт фильм с переданными в теле запроса данными
router.delete('/:filmId', deleteFilmValidation, deleteFilm); // удаляет сохранённый фильм по id

module.exports = router;
