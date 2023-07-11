const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? `Ошибка сервера ${statusCode}` : `${message}, ошибка ${statusCode}`,
  });
  next();
};

module.exports = { errorHandler };
