import { IHttpServer } from './IHttpServer';
import { Application, RequestHandler, Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';
import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import { CONTROLLERS } from '../Controllers';

export class Server implements IHttpServer {
    private app: Application;
    private logger: Logger;

    constructor(logger) { this.logger = logger; }

    // HTTP Request Methods...
    public get(url: string, requestHandler: RequestHandler): void {
        this.addRoute('get', url, requestHandler);
    }
    public post(url: string, requestHandler: RequestHandler): void {
        this.addRoute('post', url, requestHandler);
    }
    public put(url: string, requestHandler: RequestHandler): void {
        this.addRoute('put', url, requestHandler);
    }
    public delete(url: string, requestHandler: RequestHandler): void {
        this.addRoute('delete', url, requestHandler);
    }

    // Injecting routes in application
    private addRoute(method: 'get' | 'post' | 'put' | 'delete', url: string, requestHandler: RequestHandler): void {
        this.app[method](url, async (req: Request, res: Response, next: NextFunction) => {
            try {
                await requestHandler(req, res, next)
            } catch (e) {
                res.status(500).send({ 
                    success: false,
                    message: 'Sever side error please look error obj for details.',
                    error: e.message
                })
            }
        })

        this.logger.log({ level: 'debug', message: `Configured Routes: ${method.toUpperCase().substr(0,3)} : ${url}` });
    }

    // Start server
    public start(): Application {
        this.app = express();

        // Setting up static directory for serving files.
        this.app.use(express.static('public'));

        // Using middleware for parsing request body
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));

        // Initializing Controllers
        CONTROLLERS.forEach(controller => controller.initialize(this));

        return this.app;
    }
}