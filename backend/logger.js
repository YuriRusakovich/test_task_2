import dotenv from 'dotenv';
dotenv.config();
import winston from 'winston';
import path from 'path';

const { format, transports } = winston;

const logFormat = format.printf(info =>
    `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`);

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'test' ? '' : 'debug',
    format: format.combine(
        format.label({
            label: path.basename(process.mainModule ? process.mainModule.filename : '')
        }),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.metadata({
            fillExcept: ['message', 'level', 'timestamp', 'label']
        })
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                logFormat
            ),
            silent: process.env.NODE_ENV === 'test'
        }),
        new transports.File({
            filename: 'logs/app.log',
            format: format.combine(
                format.json()
            )
        })
    ],
    exitOnError: false
});

logger.connect = (port) => logger.info(
    `Server started listening http://localhost:${port}`,
    { port: port }
);

logger.internalError = (err, res, req) => logger.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
);

logger.notFound = (res, req) => logger.error(
    `${res.statusCode || 404} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
);

export default logger;