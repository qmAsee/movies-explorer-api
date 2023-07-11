const router = require('express').Router();

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

const {
  updateUserValidation,
  findUserByIdValidation,
} = require('../middlewares/fieldsValidation');

router.get('/me', findUserByIdValidation, getCurrentUser); // возвращает информацию о пользователе (email и имя)
router.patch('/me', updateUserValidation, updateUser); // обновляет информацию о пользователе (email и имя)

module.exports = router;

// ДОБАВИТЬ ВАЛИДАЦИЮ ЧЕРЕЗ JOI В РОУТЫ!!!
