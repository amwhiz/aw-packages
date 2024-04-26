/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { logger } from '@aw/logger';
import { QueueInputType } from '@aw/sqs/types/queueInput';
import { AwSQS } from 'packages/aw-sqs';
import { QueueType } from 'packages/aw-sqs/enums/queueType';
import { env } from 'packages/aw-env';
import { commonMessage } from 'src/infrastructures/constant/common.constant';

export const pushToQueue = async (body) => {
  logger.info('webhookData');
  logger.info(`webhook data: ${JSON.stringify(body)}`);
  for (const element of body) {
    const payload: QueueInputType = {
      data: {
        data: element as QueueInputType['data']['data'],
      },
    };
    const client = new AwSQS();
    const response = await client.push(payload, {
      Type: QueueType.FIFO,
      Url: env('queueUrl'),
      MessageGroupId: 'MessageGroupId',
      MessageDeduplicationId: 'DeduplicationId',
    });

    logger.info(JSON.stringify(response));
    logger.info('Successfully pushed to Queue');
    return { message: commonMessage.successMsg };
  }
};
