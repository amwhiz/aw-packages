/* eslint-disable @typescript-eslint/no-explicit-any */
import { SendMailClient } from 'zeptomail';
import { env } from '@aw/env';
import { BaseMailProvider } from '../base';
import { buildOptions } from './helpers/buildMailOptions';
import { BodyMessageRequestType } from '../interfaces/bodyMessageRequest';

export class ZeptoMail extends BaseMailProvider {
  private client: SendMailClient;

  constructor() {
    super();
    this.client = new SendMailClient({
      url: `${env('zeptoMailBaseUri')}`,
      token: `${env('zeptoToken')}`,
    });
  }

  private handlerError(err: any): void {
    //store in database or throw an error
    throw new Error(err);
  }

  async sendMail(bodyMessageRequest: BodyMessageRequestType): Promise<void> {
    const bodyMessage = buildOptions(bodyMessageRequest);
    try {
      return await this.client.sendMail(bodyMessage);
    } catch (err) {
      this.handlerError(err);
    }
  }

  sendTemplate(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
