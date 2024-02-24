import { BodyMessageRequestType } from './interfaces/bodyMessageRequest';
import { MailProvider } from './interfaces/mailProvider';

export abstract class BaseMailProvider implements MailProvider {
  abstract sendMail(bodyMessageRequest: BodyMessageRequestType): Promise<void>;
  abstract sendTemplate(): Promise<void>;
}
