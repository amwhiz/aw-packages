/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@aw/logger';
import { Client } from '@hubspot/api-client';
import { FormService } from '../../../interfaces/crmServices';
import { defaultPagingResults } from '../constants/paging';
import { FormTypes } from '../types/formType';
import { ArchivedType } from '../types/commonType';
import { PagingType } from '../types/responseType';

/** For More info Forms: https://developers.hubspot.com/docs/api/marketing/forms */
export class Form implements FormService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getAll<O>(limit: number = 10, after: string, archived: ArchivedType = false, formTypes: FormTypes = ['all']): Promise<PagingType<O>> {
    try {
      const response = await this.client.marketing.forms.formsApi.getPage(after, limit, archived, formTypes);
      logger.info('Api Response', { data: response });
      return response as PagingType<O>;
    } catch (e) {
      return defaultPagingResults;
    }
  }

  async get<O>(formId: string): Promise<O | undefined> {
    try {
      const archived = undefined;

      const response = await this.client.marketing.forms.formsApi.getById(formId, archived);
      return response as O;
    } catch (e) {
      return;
    }
  }
}
