import { HSMLocalizableParameters } from 'messagebird/types/conversations';
import { CommonType } from './message';

export type SendTemplateMessageRequest = CommonType & {
  templateId: string;
  templateName: string;
  params: HSMLocalizableParameters[];
};
