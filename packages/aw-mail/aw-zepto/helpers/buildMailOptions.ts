import { OptionsType } from '../types/mailOptions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildOptions = (bodyMessageRequest: any): OptionsType => {
  const options: OptionsType = {
    htmlBody: bodyMessageRequest.html, // Fill this based on your logic
    from: {
      address: bodyMessageRequest.fromAddress, //from email address
      name: bodyMessageRequest.name,
    },
    to: [
      {
        email_address: {
          address: bodyMessageRequest.toAddress, // Fill this based on your logic
          name: bodyMessageRequest.name, // Fill this based on your logic
        },
      },
    ],
    subject: bodyMessageRequest.subject,
    attachments: [
      {
        name: bodyMessageRequest.attachmentName,
        content: bodyMessageRequest.attachmentContent,
        mime_type: 'plain/txt',
      },
    ],
  };
  return options;
};
