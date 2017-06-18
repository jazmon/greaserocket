const logger = require('winston');

logger.level = process.env.LOG_LEVEL || 'silly';
logger.add(logger.transports.File, { filename: 'server.log' });

module.exports = logger;
