import winston from 'winston';
import path from 'path';

const { format, transports } = winston;

const logFormat = format.printf(
    (info) =>
        `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`,
);

export const logger = winston.createLogger({
    level: 'debug',
    format: format.combine(
        format.label({
            label: path.basename(
                process.mainModule ? process.mainModule.filename : '',
            ),
        }),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.metadata({
            fillExcept: ['level', 'timestamp', 'message', 'label'],
        }),
    ),
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), logFormat),
        }),
        new transports.File({
            filename: 'logs/app.log',
            format: format.combine(format.json()),
        }),
    ],
    exitOnError: false,
});
