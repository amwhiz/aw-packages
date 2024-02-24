import { BodyMessageRequestType } from '../../interfaces/bodyMessageRequest';
import { mailOptions } from '../types/mailOptions';

export const buildMailOptions = (bodyMessageRequest: BodyMessageRequestType): mailOptions => ({
  from: bodyMessageRequest.fromAddress, // sender address
  to: bodyMessageRequest.toAddress as string, // list of receivers
  bcc: bodyMessageRequest.bcc as string,
  subject: bodyMessageRequest.subject, // Subject line
  text: bodyMessageRequest.text as string, // plain text body
  html: bodyMessageRequest.html as string,
  attachments: [
    {
      filename: bodyMessageRequest.attachmentFileName as string, // Name of the attachment
      path: bodyMessageRequest.attachmentPath as string,
    },
  ],
});
