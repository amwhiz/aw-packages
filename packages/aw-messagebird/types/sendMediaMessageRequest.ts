import { CommonType } from './message';

export type SendMediaMessageRequest = CommonType & {
  templateId: string;
  templateName: string;
  url: string;
};
