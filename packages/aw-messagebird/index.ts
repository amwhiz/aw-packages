/* eslint-disable @typescript-eslint/no-explicit-any */
import RetryMechanism from '@aw/retry-mechanism';
import { axiosClient } from '@aw/axios';
import { ResponseType } from '@aw/axios/types/response';
import { MessageBirdUrls } from './constants/urls';
import { ConversationParameter, SendResponseMessage } from './interfaces/conversation';
import { StatusCodes } from '@aw/retry-mechanism/enums/statusCodes';
import { env } from '@aw/env';

export default class MessageBirdClient {
  public baseUrl: string = MessageBirdUrls['baseURI'];
  private retryMechanism: RetryMechanism;

  constructor(_opt: { numberOfApiCallRetries: number } = { numberOfApiCallRetries: 0 }) {
    this.retryMechanism = new RetryMechanism(_opt.numberOfApiCallRetries);
    axiosClient.setHeaders({
      Authorization: `AccessKey ${env('messageBirdAccessKey')}`,
    });
  }

  getAbsoluteUri(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  private async handleError(
    response: ResponseType,
    method: (...args: any) => Promise<any>,
    isNotCallFromRetry: boolean,
    ...args: any
  ): Promise<void> {
    if (response?.['statusCode'] && response?.['statusCode'] >= StatusCodes.MinServerError) {
      if (isNotCallFromRetry) {
        await this.retryMechanism.retry(method)(...args, false);
      }
    }
  }

  private async makeRequest(url: string, method: 'get' | 'post', isNotCallFromRetry: boolean, payload?: Record<string, any>): Promise<ResponseType> {
    const response: ResponseType = await axiosClient[method](url, payload);
    await this.handleError(response, this.makeRequest.bind(this), isNotCallFromRetry, url, method, payload);
    return response;
  }

  public async sendTemplateMessage(payload: ConversationParameter, isNotCallFromRetry = true): Promise<SendResponseMessage> {
    const url: string = this.getAbsoluteUri(MessageBirdUrls['sendMessage']);
    const response = await this.makeRequest(url, 'post', isNotCallFromRetry, payload);

    const sendMessageResponse: SendResponseMessage = response?.data as SendResponseMessage;
    return sendMessageResponse;
  }

  // Supported media file and size: image	image/jpeg, image/png and	5 MB
  public async sendMediaMessage(payload: ConversationParameter, isNotCallFromRetry = true): Promise<SendResponseMessage> {
    const url: string = this.getAbsoluteUri(MessageBirdUrls['sendMessage']);
    const response = await this.makeRequest(url, 'post', isNotCallFromRetry, payload);

    const sendMediaMessageResponse: SendResponseMessage = response?.data as SendResponseMessage;
    return sendMediaMessageResponse;
  }
}
