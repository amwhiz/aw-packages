import { env } from '@aw/env';
import { MailProviders } from './enums/mailProvider';
import { BaseMailProvider } from './base';
import { MailProvider } from './interfaces/mailProvider';
import { ZeptoMail } from './aw-zepto';
import { BodyMessageRequestType } from './interfaces/bodyMessageRequest';
import { NodeMailer } from './aw-nodemailer';
import { error } from 'console';

export class MailProcessor implements BaseMailProvider {
  private provider: MailProvider | undefined;

  constructor() {
    this.provider = this.init();
  }

  /**
   * Initializes the mail provider based on the configuration specified in the environment variables.
   * Returns the selected mail provider object or undefined if the provider is not recognized.
   * Throws an error if the configured mail provider does not exist.
   */

  init(): MailProvider | undefined {
    switch (env('mailProvider')) {
      case MailProviders.zepto:
        return new ZeptoMail();
      case MailProviders.nodeMailer:
        return new NodeMailer();
      default:
        throw new error('The provider you mentioned does not exist.');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async sendMail(bodyMessageRequest: BodyMessageRequestType): Promise<void> {
    if ('sendMail' in (this.provider ?? {})) {
      return this.provider?.sendMail(bodyMessageRequest);
    }
    throw new Error('Method not support for this provider.');
  }

  async sendTemplate(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
