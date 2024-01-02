import { MessageType } from '../enums/messageType';

export type MessageRequestType = {
  type: MessageType;
  body: TemplateParams | 'string'; // Only allow 1024 for button Message
  buttons?: Texts;
  templateName?: string;
  whatsAppNumber: string;
};

export type TemplateParams = {
  [key: string]: string | number;
};

export type Texts = string[];

export type NullishStringType = string | null;

export type MessageSuccessResponseType = {
  ok: boolean;
  result: string;
  errors: [];
  message: {
    whatsappMessageId: string;
    localMessageId: NullishStringType;
    text: string;
    media: NullishStringType;
    messageContact: NullishStringType;
    location: NullishStringType;
    type: string;
    time: string;
    status: number;
    statusString: NullishStringType;
    isOwner: boolean;
    isUnread: boolean;
    ticketId: string;
    avatarUrl: NullishStringType;
    assignedId: NullishStringType;
    operatorName: NullishStringType;
    replyContextId: NullishStringType;
    sourceType: 0;
    id: string;
    created: string;
    conversationId: string;
    failedDetail: NullishStringType;
    messageReferral: NullishStringType;
    messageProducts: NullishStringType;
    orderProducts: NullishStringType;
    orderDetails: NullishStringType;
    paymentStatus: NullishStringType;
    interactiveData: {
      type: number;
      header: NullishStringType;
      body: {
        text: NullishStringType;
      };
      footer: NullishStringType;
      action: {
        button: NullishStringType;
        buttons: ButtonResponse[];
        catalog_id: NullishStringType;
        product_retailer_id: NullishStringType;
        sections: NullishStringType;
        name: NullishStringType;
        parameters: NullishStringType;
      };
    };
  };
};

export type ButtonResponse = {
  type: string;
  reply: {
    id: string;
    title: string;
  };
};
