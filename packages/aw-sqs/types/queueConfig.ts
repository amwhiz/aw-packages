import { QueueType } from '../enums/queueType';

export type QueueConfigType = {
  url: string;
  MessageDeduplicationId: string;
  MessageGroupId: string;
  type: QueueType;
};
