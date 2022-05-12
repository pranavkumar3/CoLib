const { format, createLogger, transports } = require('winston');
var DatadogWinston = require('winston-datadog')
const { timestamp, combine, printf, errors } = format;
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

const winston = require('winston');
const env = process.env.NODE_ENV;
const logDir = 'logs';
const fs = require('fs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
 }

const now = new Date();
var logger = winston.createLogger({
        format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
transports: [

    new winston.transports.File({
        name: 'error-logs',
        filename: './logs/exceptions.log',
        level: 'error',
        json: false
    }),

    new winston.transports.File({
        name: 'info-logs',
        filename: './logs/info.log',
        level: 'info',
        json: false
    }),

    new(require('winston-daily-rotate-file'))({
        filename: `${logDir}/routes.log`,
        timestamp: now,
        datePattern: 'dd-MM-yyyy',
        prepend: true,
        json: false,
        level: env === 'development' ? 'verbose' : 'info'
    })
],
exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding) {
    logger.info(message);
    console.log('message=', message);
  }
};