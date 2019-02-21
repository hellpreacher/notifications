import { config } from '../config';
import { Server } from '../src/Server';

// Initiating server object by passing logger
const server = new Server(config.logger).start()

server.listen(config.PORT, () => {
    config.logger.log({ level: 'info', message: `Server listening on http://localhost:${config.PORT}` });
});