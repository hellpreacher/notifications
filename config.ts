import * as dotenv from 'dotenv';
const { createLogger, format, transports } = require('winston');
const { combine, label, timestamp, prettyPrint } = format;
import * as path from 'path';
import * as moment from 'moment';

dotenv.config();

const logger = createLogger({
    level: 'debug',
    format: combine(label({ label: 'Server' }), timestamp(), prettyPrint()),
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(__dirname, 'logs/' + moment().format('MMDDYYYY') + '-log.log') })
    ]
});

export const config = {
    PORT: +process.env.PORT || 8080,
    logger,
    publicVapidKey: process.env.publicVapidKey,
    privateVapidKey: process.env.privateVapidKey,
    public_html: path.join(__dirname, 'public')
}