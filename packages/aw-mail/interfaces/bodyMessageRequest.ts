interface EmailAddress {
  address: string;
  name?: string;
}

interface EmailRecipient {
  email: EmailAddress;
}

export interface BodyMessageRequestType {
  fromAddress: string;
  toAddress: string | EmailRecipient[];
  bcc?: string | EmailRecipient[];
  cc?: string | EmailRecipient[];
  text?: string;
  subject?: string;
  htmlBody?: string;
  html?: string;
  attachmentName?: string;
  attachmentContent?: string;
  attachmentFileName?: string;
  attachmentPath?: string;
}
