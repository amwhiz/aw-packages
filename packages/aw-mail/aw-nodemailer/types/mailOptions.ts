export type mailOptions = {
  from: string;
  to: string;
  bcc?: string;
  subject?: string;
  text: string;
  html: string;
  attachments?: [
    {
      filename: string; // Name of the attachment
      path: string;
    },
  ];
};
