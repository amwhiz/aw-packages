/* eslint-disable @typescript-eslint/no-explicit-any */
export * from './authorizer';

import { logger } from '@aw/logger';
import { axiosClient } from '@aw/axios';
import { Constants } from './config/config';
import { RecordsResponse } from './types/table';
import { env } from '@aw/env';

export class AirtableClient {
  private readonly baseUrl: string = Constants.baseUrl;
  private readonly accessToken = env('airTableToken');
  constructor() {}

  private getHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  async refreshWebhook(baseId: string, webhookId: string): Promise<any> {
    logger.info('Refresh Webhook');
    try {
      const url = `${this.baseUrl}bases/${baseId}/webhooks/${webhookId}/refresh`;
      const headers = this.getHeaders();
      const response = await axiosClient.post(url, {}, { headers: headers });
      return response.data;
    } catch (error) {
      logger.error('Error Refreshing Webhook', error?.message);
      throw error;
    }
  }

  async getAirtableItems(baseId: string, tableId: string, recordId: string): Promise<RecordsResponse> {
    logger.info('getAirtableItems');
    try {
      const url = `${this.baseUrl}/${baseId}/${tableId}/${recordId}`;
      const headers = this.getHeaders();
      const response = await axiosClient.get(url, { headers: headers });
      return response.data;
    } catch (error) {
      logger.error('Error Getting Airtable Items', error?.message);
      throw error;
    }
  }

  async listWebhooks(baseId: string): Promise<any> {
    logger.info('lListWebhooks');
    try {
      const url = `${this.baseUrl}bases/${baseId}/webhooks`;
      const headers = this.getHeaders();
      const response = await axiosClient.get(url, { headers: headers });
      return response.data;
    } catch (error) {
      logger.error('Error listing webhooks:', error?.message);
      throw error;
    }
  }

  async getSpecificObjectFromWebhook(baseId: string, webhookId: string, cursor = 1): Promise<any> {
    logger.info('Get Specification Object From Webhook');
    try {
      const url = `${this.baseUrl}/bases/${baseId}/webhooks/${webhookId}/payloads?cursor=${cursor}`;
      const headers = this.getHeaders();
      const response = await axiosClient.get(url, { headers: headers });
      return response.data;
    } catch (error) {
      logger.error('Error GetSpecificationObject from webhook', error);
    }
  }

  async updateRecords(recordId: string, records: any, baseId: string, tableId: string): Promise<any> {
    logger.info('Update Records');
    try {
      const url = `${this.baseUrl}/${baseId}/${tableId}/${recordId}`;
      const headers = this.getHeaders();
      const payload = {
        fields: records,
      };
      const response = await axiosClient.patch(url, payload, { headers: headers });
      return response;
    } catch (error) {
      logger.error('Error update Records', error?.message);
      throw Error(error);
    }
  }

  async createRecords(records: any, baseId: string, tableId: string): Promise<string | any> {
    logger.info('Create Records');
    try {
      const url = `${this.baseUrl}/${baseId}/${tableId}`;
      const headers = this.getHeaders();

      const payload = {
        fields: records,
      };

      return await axiosClient.post(url, payload, { headers: headers });
    } catch (error) {
      logger.error('Error:', error?.message);
    }
  }
}
