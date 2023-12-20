/* eslint-disable no-console */
import {
  SQSClient,
  SQSClientConfig,
  SendMessageCommand,
  SendMessageCommandOutput,
} from '@aws-sdk/client-sqs';
import { env } from '@aw/env';
import { QueueInputType } from './types/queueInput';
import { QueueConfigType } from './types/queueConfig';
import { getParams } from './helpers/getParams';

export class AwSQS {
  private readonly region: string = env('region') as string;
  private readonly accessKeyId: string = env('accessKey') as string;
  private readonly secretAccessKey: string = env('secretAccessKey') as string;
  private client: SQSClient;

  constructor() {
    this.initializeSQSClient();
  }

  getCredentials(): SQSClientConfig {
    return {
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    };
  }

  initializeSQSClient(): void {
    this.client = new SQSClient(this.getCredentials());
  }

  async push(payload: QueueInputType, queueConfig: QueueConfigType): Promise<SendMessageCommandOutput> {
    const params = getParams(queueConfig, payload);
    const command = new SendMessageCommand(params);

    return this.client.send(command);
  }
}
