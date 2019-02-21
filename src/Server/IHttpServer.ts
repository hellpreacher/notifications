import { RequestHandler } from 'express';

export interface IHttpServer {
    get(url: string, requserHandler: RequestHandler): void;
    post(url: string, requserHandler: RequestHandler): void;
    put(url: string, requserHandler: RequestHandler): void;
    delete(url: string, requserHandler: RequestHandler): void;
}