import { CommonType } from './message';

export type SendMediaMessageRequest = CommonType & {
  url: string;
};
