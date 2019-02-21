import { IHttpServer } from "../Server/IHttpServer";

export interface IController {
    initialize(httpServer: IHttpServer): void;
}