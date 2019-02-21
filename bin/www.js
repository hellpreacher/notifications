"use strict";
exports.__esModule = true;
var config_1 = require("../config");
var Server_1 = require("../src/Server");
// Initiating server object by passing logger
var server = new Server_1.Server(config_1.config.logger).start(config_1.config.public_html);
server.listen(config_1.config.PORT, function () {
    config_1.config.logger.log({ level: 'info', message: "Server listening on http://localhost:" + config_1.config.PORT });
});
