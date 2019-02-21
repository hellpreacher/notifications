"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var _a = require('winston'), createLogger = _a.createLogger, format = _a.format, transports = _a.transports;
var combine = format.combine, label = format.label, timestamp = format.timestamp, prettyPrint = format.prettyPrint;
var path = require("path");
var moment = require("moment");
dotenv.config();
var logger = createLogger({
    level: 'debug',
    format: combine(label({ label: 'Server' }), timestamp(), prettyPrint()),
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(__dirname, 'logs/' + moment().format('MMDDYYYY') + '-log.log') })
    ]
});
exports.config = {
    PORT: +process.env.PORT || 8080,
    logger: logger,
    publicVapidKey: process.env.publicVapidKey,
    privateVapidKey: process.env.privateVapidKey,
    public_html: path.join(__dirname, 'public')
};
