import * as winston from 'winston';
const logger = new winston.Logger({
  level: process.env.LOG_LEVEL || 'silly',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'somefile.log' })
  ]
});

export default logger;
