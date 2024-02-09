export * from './signature';

import * as hubspot from '@hubspot/api-client';
import { env } from '@aw/env';
import { logger } from '@aw/logger';

class HubspotClient {
  hubspotClient: hubspot.Client;
  constructor() {
    this.hubspotClient = new hubspot.Client({
      accessToken: env('hubAccessToken'),
    });
  }

  async getFormNameById(formId: string): Promise<string> {
    logger.info(`fetchForm, ${formId}`);
    try {
      const apiResponse = await this.hubspotClient.marketing.forms.formsApi.getById(formId, undefined);
      return apiResponse.name;
    } catch (error) {
      logger.error('Error fetching form:', error);
      throw error;
    }
  }

  async getOwnerById(ownerId: string): Promise<string | undefined> {
    logger.info('get Owner By Id', ownerId);
    try {
      const response = await this.hubspotClient.crm.owners.ownersApi.getById(Number(ownerId), 'id', false);
      return response.email;
    } catch (error) {
      logger.error('Error From Getting Owner:', error);
    }
  }

  async getContactFromHubspot(contactId: string): Promise<object> {
    logger.info(`getContact From Hubspot, ${contactId}`);
    try {
      const properties = undefined;
      const propertiesWithHistory = [];

      const apiResponse = await this.hubspotClient.crm.contacts.basicApi.getById(contactId, properties, propertiesWithHistory, undefined, false);
      return apiResponse;
    } catch (error) {
      logger.error('Error getting contact from HubSpot:', error.message);
      throw error;
    }
  }
}

export const hubspotService = new HubspotClient();
