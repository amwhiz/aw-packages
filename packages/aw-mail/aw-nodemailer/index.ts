/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseMailProvider } from '../base';
import * as nodeMailer from 'nodemailer';
import { env } from '@aw/env';
import { buildMailOptions } from './helpers/buildMailOptions';
import { BodyMessageRequestType } from '../interfaces/bodyMessageRequest';

export class NodeMailer extends BaseMailProvider {
  private handlerError(err: any): void {
    //store in database or throw an error
    throw new Error(err);
  }

  async sendMail(bodyMessageRequest: BodyMessageRequestType): Promise<void> {
    const transport = nodeMailer.createTransport({
      host: env('mailHost'), // e.g., 'smtp.example.com'
      port: 587, // e.g., 587 for TLS or 465 for SSL
      auth: {
        user: env('mailUserName'), // Enter your SMTP username here
        pass: env('zeptoMainAgentToken'),
      },
    });

    try {
      const bodyMessage = buildMailOptions(bodyMessageRequest);
      return await transport.sendMail(bodyMessage);
    } catch (err) {
      this.handlerError(err);
    }
  }

  sendTemplate(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
