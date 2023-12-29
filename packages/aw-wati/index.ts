import { axiosClient } from '@aw/axios';
import { env } from '@aw/env';
import { LoggerService } from '@aw/logger';
import { MessageRequestType, MessageSuccessResponseType, TemplateParams, Texts } from './types/message';
import { MessageType } from './enums/messageType';
import { Parameters, TemplateMessage, TemplateMessageResponse } from './types/templateMessage';
import { ButtonMessage } from './types/buttonMessage';
import { urls } from './constants/urls';

export default class WatiClient {
  private baseUrl: string = env('watiBaseUri') as string;
  // Logger
  private logger = new LoggerService({ serviceName: WatiClient.name });

  constructor() {
    axiosClient.setHeaders({
      Authorization: env('watiAccessToken'),
    });
  }

  private getAbsoluteUri(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  private buildTemplateAttributes(body: TemplateParams): Parameters[] {
    return Object.entries(body).map(([name, value]) => ({ name, value }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  private async handleError(response: any, _requestPayload: any, _requestUrl: URL): Promise<void> {
    // Handle your DB log Here
    if (response?.['errors'] || !response?.message) {
      throw new Error('Something went wrong!'); // Need to handle error
    }
  }

  private getSendMessageParams(messageBody: MessageRequestType): TemplateMessage | ButtonMessage {
    // For Template Messages.
    if (messageBody.type === MessageType.Template) {
      return {
        broadcast_name: 'string',
        template_name: messageBody.templateName as string,
        parameters: this.buildTemplateAttributes(messageBody.body as TemplateParams),
      };
    }

    // For Button Interactive Messages.
    return {
      body: messageBody?.body as string,
      buttons: (messageBody.buttons as Texts).map((text) => ({
        text,
      })),
    };
  }

  private async sendButtonMessage(messageBody: MessageRequestType): Promise<MessageSuccessResponseType> {
    const url = this.getAbsoluteUri(urls['buttonsMessage']);
    const requestUrl = new URL(url);
    requestUrl.searchParams.append('whatsappNumber', messageBody.whatsAppNumber as string);

    const messageRequestBody = this.getSendMessageParams(messageBody) as ButtonMessage;
    const messageResponse = await axiosClient.post<ButtonMessage, MessageSuccessResponseType>(url, messageRequestBody);

    this.handleError(messageResponse, messageRequestBody, requestUrl);
    return messageResponse;
  }

  private async sendSessionMessage(messageBody: MessageRequestType): Promise<MessageSuccessResponseType> {
    const url = this.getAbsoluteUri(urls['sessionMessage']);
    const requestUrl = new URL(url, `/${messageBody.whatsAppNumber}`);
    requestUrl.searchParams.append('messageText', messageBody.body as string);

    const messageResponse = await axiosClient.post<null, MessageSuccessResponseType>(url);

    this.handleError(messageResponse, null, requestUrl);
    return messageResponse;
  }

  async sendMessage(messageBody: MessageRequestType): Promise<MessageSuccessResponseType> {
    if (!messageBody?.whatsAppNumber) throw new Error('Whatsapp Number is required field');
    if (messageBody.type === MessageType.Button) return await this.sendButtonMessage(messageBody);
    return await this.sendSessionMessage(messageBody);
  }

  async sendMessageTemplate(messageBody: MessageRequestType): Promise<TemplateMessageResponse> {
    const url = this.getAbsoluteUri(urls['templateMessage']);
    const requestUrl = new URL(url);
    requestUrl.searchParams.append('whatsappNumber', messageBody.whatsAppNumber as string);

    const messageRequestBody = this.getSendMessageParams(messageBody) as TemplateMessage;
    const messageResponse = await axiosClient.post<TemplateMessage, TemplateMessageResponse>(url, messageRequestBody);

    this.handleError(messageResponse, messageRequestBody, requestUrl);
    return messageResponse;
  }
}
