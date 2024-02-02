/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionResponseFormDefinitionBaseForwardPaging, FormDefinitionBase } from '@hubspot/api-client/lib/codegen/marketing/forms';
import { logger } from '@aw/logger';
import { Client } from '@hubspot/api-client';

export class Form {
  private client: Client;

  public constructor(client: Client) {
    this.client = client;
  }

  public async getAllforms(): Promise<CollectionResponseFormDefinitionBaseForwardPaging | void> {
    try {
      const after = undefined;
      const limit = undefined;
      const archived = undefined;
      const formTypes = undefined;

      const response = await this.client.marketing.forms.formsApi.getPage(after, limit, archived, formTypes);
      logger.info('Api Response', { data: response });
      return response;
    } catch (e) {
      logger.error('Error on get all hubspot forms', { error: e?.message });
    }
  }

  public async getSingleForm(formId: string): Promise<FormDefinitionBase | void> {
    try {
      const archived = undefined;

      const response = await this.client.marketing.forms.formsApi.getById(formId, archived);
      logger.info('Api Response', { data: response });
      return response;
    } catch (e) {
      logger.error('Error on get single hubspot form', { error: e?.message });
    }
  }
}
