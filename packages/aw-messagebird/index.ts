/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@aw/env';
import { ConversationParameter, MessageBird, SendResponseMessage, initClient } from 'messagebird';
import { SendTemplateMessageRequest } from './types/sendTemplateMessageRequest';
import { MessageTypeEnum } from './enums/messageType';
import { GetMessageType } from './types/message';
import { SendMediaMessageRequest } from './types/sendMediaMessageRequest';

export default class MessageBirdClient {
  private messagebirdClient: MessageBird;

  constructor() {
    this.messagebirdClient = initClient(env('messageBirdAccessKey') as string);
  }

  private async handleError(response: Error | null): Promise<void> {
    if (response?.['error'] || !response?.message) {
      throw new Error('Something went wrong!'); // Need to handle error
    }
  }

  private getMessageRequest(payload: GetMessageType): ConversationParameter {
    const conversationParams: ConversationParameter = {
      from: payload.from,
      to: payload.to,
      type: MessageTypeEnum.HSM,
      content: {
        hsm: {
          namespace: payload.templateId,
          templateName: payload.templateName,
          params: payload?.['params'],
          language: {
            policy: 'deterministic',
            code: 'en',
          },
        },
      },
      reportUrl: '',
    };

    if (payload.type === MessageTypeEnum.Image) {
      conversationParams['type'] = MessageTypeEnum.Image;
      conversationParams['content'] = {
        image: {
          url: payload?.['url'],
        },
      };
    }

    return conversationParams;
  }

  public async sendTemplateMessage(payload: SendTemplateMessageRequest): Promise<SendResponseMessage> {
    const sendMessageRequest: ConversationParameter = this.getMessageRequest(payload);
    let messageResponse: SendResponseMessage = {} as SendResponseMessage;
    this.messagebirdClient.conversations.send(sendMessageRequest, (e, data) => {
      this.handleError(e);
      messageResponse = data?.message as SendResponseMessage;
    });
    return messageResponse;
  }

  // Supported media file and size: image	image/jpeg, image/png and	5 MB
  public async sendMediaMessage(payload: SendMediaMessageRequest): Promise<SendResponseMessage> {
    const sendMessageRequest: ConversationParameter = this.getMessageRequest(payload);
    let messageResponse: SendResponseMessage = {} as SendResponseMessage;
    this.messagebirdClient.conversations.send(sendMessageRequest, (e, data) => {
      this.handleError(e);
      messageResponse = data?.message as SendResponseMessage;
    });
    return messageResponse;
  }
}
