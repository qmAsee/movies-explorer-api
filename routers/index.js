const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const NotFound = require('../utils/errorClasses/ErrorNotFound');

const {
  createUser,
  login,
} = require('../controllers/users');

const {
  signinValidation,
  signupValidation,
} = require('../middlewares/fieldsValidation');

router.post('/signup', signupValidation, createUser); // создаёт пользователя с переданными в теле email, password и name
router.post('/signin', signinValidation, login); // # проверяет переданные в теле почту и пароль и возвращает JWT

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
