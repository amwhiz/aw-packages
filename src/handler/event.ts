/* eslint-disable no-undef */
import { handlerPath } from '@libs/handler-resolver';
import { AWSFunction } from '@libs/lambda';

export const queueHandler = {
  handler: `${handlerPath(__dirname)}/handler.webhookHandler`,
  events: [
    {
      http: {
        method: 'post',
        path: `webhook`,
      },
    },
  ],
} as AWSFunction;

export const queueWorker = {
  handler: `${handlerPath(__dirname)}/handler.webhookWorker`,
  events: [
    {
      sqs: {
        arn: {
          'Fn::GetAtt': ['QueueName', 'Arn'],
        },
        batchSize: 1,
      },
    },
  ],
} as AWSFunction;

export const ping = {
  handler: `${handlerPath(__dirname)}/handler.pingPong`,
  events: [
    {
      http: {
        method: 'post',
        path: 'ping',
      },
    },
  ],
} as AWSFunction;
