import { ActionAfterCompletion } from '@aws-sdk/client-scheduler';
import { ScheduleTargetEnum } from '../enums/scheduleTarget';

export type ScheduleType<T> = {
  name: string;
  description?: string;
  scheduleExpressAt: string; // Schedule expression at(yyyy-mm-ddThh:mm:ss)
  data?: T;
  ActionAfterCompletion: ActionAfterCompletion;
  scheduleTargetType: ScheduleTargetEnum;
  messageGroupId?: string;
};
