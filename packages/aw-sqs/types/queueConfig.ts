import { QueueType } from '../enums/queueType';

export type QueueConfigType = {
  Url: string;
  MessageDeduplicationId: string;
  MessageGroupId: string;
  Type: QueueType;
};
