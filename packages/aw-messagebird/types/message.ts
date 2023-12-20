import { MessageTypeEnum } from '../enums/messageType';
import { SendMediaMessageRequest } from './sendMediaMessageRequest';
import { SendTemplateMessageRequest } from './sendTemplateMessageRequest';

export type CommonType = {
  from: string;
  to: string;
  type: MessageTypeEnum;
};

export type GetMessageType = SendTemplateMessageRequest | SendMediaMessageRequest;
