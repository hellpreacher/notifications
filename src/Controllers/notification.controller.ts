import { IHttpServer } from "../Server/IHttpServer";
import { Request, Response } from "express";
import * as webpush from 'web-push';
import { config } from "../../config";

webpush.setVapidDetails('mailto:kainthola.siddharth@gmail.com', config.publicVapidKey, config.privateVapidKey);

export class PushNotificationController {
    private baseUrl: string = 'notification/';
    private subscription;

    initialize(Noitfy: IHttpServer) {
        // Subscribe to notification
        Noitfy.post(this.baseUrl + 'subscribe', this.subscribe.bind(this));
        Noitfy.post(this.baseUrl + 'push', this.push.bind(this));
    }

    private async subscribe(req: Request, res: Response): Promise<void> {
        this.subscription = req.body
        res.send({
            success: true,
            message: 'Successfully subscribed',
            subscription: this.subscription
        });
    }

    private async push(req: Request, res: Response): Promise<void> {
        if (req.body) {
            const payload = JSON.stringify(req.body);
            webpush.sendNotification(this.subscription, payload)
                .then(() => res.send({ success: true, message: 'Notification successfull' }))
                .catch(err => res.send({ success: false, message: err.message }));
            return;
        }

        res.send({ success: false, message: 'Please send message for notificaton' });
    }
}