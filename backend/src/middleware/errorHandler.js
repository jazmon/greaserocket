const logger = require('../logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: true, message: err.message || 'Something went wrong' });
};

module.exports = errorHandler;
