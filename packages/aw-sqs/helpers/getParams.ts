import { SendMessageCommandInput } from '@aws-sdk/client-sqs';
import { QueueConfigType } from '../types/queueConfig';
import { QueueInputType } from '../types/queueInput';
import { QueueType } from '../enums/queueType';
import { v1 as uuidv1 } from 'uuid';

export const getParams = (queueConfig: QueueConfigType, payload: QueueInputType): SendMessageCommandInput => {
  const params: SendMessageCommandInput = {
    QueueUrl: queueConfig.url,
    MessageBody: JSON.stringify(payload?.data || '{}'),
  };

  if (queueConfig.type === QueueType.FIFO) {
    // For fifo queue message duplication handle
    params['MessageGroupId'] = queueConfig.MessageGroupId;
    params['MessageDeduplicationId'] = `${queueConfig.MessageDeduplicationId}-${uuidv1()}`;
  }

  return params;
};
