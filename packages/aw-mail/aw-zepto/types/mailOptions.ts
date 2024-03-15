type EmailAddress = {
  address: string; //valid email address
  name?: string;
};

export type EmailRecipient = {
  email_address: EmailAddress;
};

type EmailAttachment = {
  name: string;
  content: string; // Assuming base64 encoded content
  mime_type: string;
};

export type OptionsType = {
  from: EmailAddress;
  to: EmailRecipient[];
  bcc?: EmailRecipient[];
  cc?: EmailRecipient[];
  subject: string;
  htmlBody: string;
  attachments?: EmailAttachment[];
};
