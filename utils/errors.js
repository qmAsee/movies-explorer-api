const NOT_VALID_DATA = 'Введены некорректные данные';

const CANNOT_CREATE_USER = 'Не удалось создать пользователя';
const EMAIL_CONFLICT = 'Пользователь с введенным email уже зарегистрирован';
const WRONG_USER_DATA = 'Почта или пароль неверны';
const USER_ID_NOT_FOUND = 'Пользователь по указанному id не найден';
const AUTH_REQUIRED = 'Для доступа требуется авторизация';

const MOVIE_ID_NOT_FOUND = 'Фильм с укказанным id не найден';
const MOVIE_DELETE_FORBIDDEN = 'Вы не можете удалять фильмы других пользователей';
const WRONG_MOVIE_DATA = 'Мы не можем найти фильм по указанным данным';

module.exports = {
  NOT_VALID_DATA,
  CANNOT_CREATE_USER,
  EMAIL_CONFLICT,
  WRONG_USER_DATA,
  USER_ID_NOT_FOUND,
  MOVIE_ID_NOT_FOUND,
  MOVIE_DELETE_FORBIDDEN,
  WRONG_MOVIE_DATA,
  AUTH_REQUIRED,
};
