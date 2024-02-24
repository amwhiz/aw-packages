import { BodyMessageRequestType } from './bodyMessageRequest';

export interface MailProvider {
  sendMail(bodyMessageRequest: BodyMessageRequestType): Promise<void>;
  sendTemplate(): Promise<void>;
}
