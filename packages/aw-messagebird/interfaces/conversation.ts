// More reference about conversations https://developers.messagebird.com/api/conversations

import { DateTime } from '../types/general';
import { HsmLanguages } from '../types/hsmLanguage';

export interface ConversationParameter {
  /** Either a channel-specific identifier for the receiver (e.g. MSISDN for SMS or WhatsApp channels), or the ID of a MessageBird Contact. */
  to: string;

  /** The ID that identifies the channel over which the message should be sent. */
  from: string;

  /** The type of the message content. */
  type: string;

  /** Content of the message. The value of type defines the required fields. */
  content: Content;

  /** The URL for delivery of status reports for the message. Must be HTTPS. */
  reportUrl: string;
}

export type Content = TextContent | ImageContent | AudioContent | VideoContent | FileContent | EmailContent | LocationContent | HSMContent;

export interface TextContent {
  /** Required for type text. The plain-text content of the message. */
  text: string;
}

export interface ImageContent {
  /** Required for type image. An object of the form {"url": "<media url>"} containing the url of the remote media file. */
  image: Media;
}

export interface VideoContent {
  /** Required for type video. An object of the form {"url": "<media url>"} containing the url of the remote media file. */
  video: Media;
}

export interface AudioContent {
  /** Required for type video. An object of the form {"url": "<media url>"} containing the url of the remote media file. */
  audio: Media;
}

export interface FileContent {
  /** Required for type file. An object of the form {"url": "<media url>"} containing the url of the remote media file. */
  file: Media;
}

export interface Media {
  url: string;
  caption?: string;
}

export interface EmailContent {
  /** Required for type email. An object containing details of the email message. */
  email: EmailContentContent;
}

export interface EmailContentContent {
  /** A unique random ID for this message on the MessageBird platform, returned upon acceptance of the message. */
  id?: string;

  to: EmailRecipient[];
  from: { name?: string; address: string };
  subject: string;
  content: {
    /** HTML content of the message, expected in UTF-8. */
    html?: string;
    /** Plain text of the message, expected in UTF-8. */
    text?: string;
  };

  /** Email address used to compose the email’s “Reply-To” header. */
  replyTo?: string;
  /** Email address used to compose the email’s “Return-Path” header. Must match your sending domain. */
  returnPath?: string;
  /** Object containing custom headers other than Subject, From, To, and Reply-To. These will be sent along with your message. */
  headers?: Record<string, string>;
  /** Allows you to set tracking options. */
  tracking?: {
    open?: boolean;
    click?: boolean;
  };
  /** The URL for delivery of status reports for the message. Must use https. */
  reportUrl?: string;
  /** Perform substitutions of variables inside the content or headers of your email (Default: true). */
  performSubstitutions?: boolean;
  /** List of files attached to a message. */
  attachments?: EmailAttachment;
  /** List of inline images added to the message content. */
  inlineImages?: EmailInlineImage;
}

export interface EmailAttachment {
  id?: string;
  name?: string;
  type?: string;
  URL: string;
  length?: number;
}

export interface EmailInlineImage extends EmailAttachment {
  contentId?: string;
}

export interface EmailRecipient {
  /** Required. Valid email address */
  email: string;
  /** Name attached to the email address, this appears in the To field in a users email client */
  name?: string;
  /** List of variables used for placeholders inside the content or headers of your email */
  variables?: Record<string, string>;
}

export interface LocationContent {
  /** Latitude and longitude are expected as floats. */
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface HSMContent {
  /** Required for type hsm. Available only for WhatsApp. */
  hsm: HSMContentContent | HSMComponentContent;
}

export interface HSMContentContent {
  /** WhatsApp namespace for your account. You will receive this value when setting up your WhatsApp account. */
  namespace: string;

  /** The name of the template. */
  templateName: string;
  language: HSMLanguage;
  params: HSMLocalizableParameters[];
}

export interface HSMComponentContent {
  /** WhatsApp namespace for your account. You will receive this value when setting up your WhatsApp account. */
  namespace: string;

  /** The name of the template. */
  templateName: string;
  language: HSMLanguage;
  components: HSMComponent[];
}

export interface HSMComponent {
  type: 'header' | 'body';
  parameters: HSMComponentParameter[];
}

export type HSMComponentParameter =
  | HSMComponentTextParameter
  | HSMComponentCurrencyParameter
  | HSMComponentDateTimeParameter
  | HSMComponentDocumentParameter
  | HSMComponentImageParameter
  | HSMComponentVideoParameter
  | HSMComponentPayloadParameter;

export interface HSMComponentTextParameter {
  type: 'text';
  text: string;
}

export interface HSMComponentCurrencyParameter {
  type: 'currency';
  currency: {
    /**
     * ISO 4217 currency code
     */
    currencyCode: string;
    /**
     * Total amount together with cents as a float, multiplied by 1000
     */
    amount: number;
  };
}

export interface HSMComponentDateTimeParameter {
  type: 'date_time';
  /**
   * RFC3339 representation of the date and time
   */
  dateTime: string;
}

export interface HSMComponentDocumentParameter {
  type: 'document';
  document: Media;
}

export interface HSMComponentImageParameter {
  type: 'image';
  image: Media;
}

export interface HSMComponentVideoParameter {
  type: 'video';
  video: Media;
}

export interface HSMComponentPayloadParameter {
  type: 'payload';
  payload: string;
}

export interface HSMLanguage {
  /**
   * Deterministic will deliver the message template in exactly the language and locale asked for while fallback will deliver the message template in user's device language,
   * if the settings can't be found on users device the fallback language is used.
   */
  policy: 'fallback' | 'deterministic';
  /** The code of the language or locale to use, accepts both language and language_locale formats (e.g., en or en_US). */
  code: HsmLanguages;
}

export type HSMLocalizableParameters = HSMLocalizableParametersCurrency | HSMLocalizableParametersDateTime;

export interface HSMLocalizableParametersCurrency {
  /**
   * Default value of the parameter, it is used when localization fails. The only field needed when specifying parameter value that doesn't require localization.
   */
  default: string;
  currency?: {
    /** string of ISO 4217 currency code */
    currencyCode: string;
    /** integer of total amount together with cents as a float, multipled by 1000 */
    amount: number;
  };
}

export interface HSMLocalizableParametersDateTime {
  /**
   * Default value of the parameter, it is used when localization fails. The only field needed when specifying parameter value that doesn't require localization.
   */
  default: string;
  /**
   * RFC3339 representation of the date and time.
   */
  dateTime?: DateTime;
}

export interface SendResponse {
  message: SendResponseMessage;
}

export interface SendResponseMessage {
  /** A unique ID generated by the MessageBird platform that identifies this message. */
  id: string;
  /** The status of the message. It will be initially set to accepted. */
  status: string | 'accepted';
  /** The fallback message */
  fallback: string | null;
}
