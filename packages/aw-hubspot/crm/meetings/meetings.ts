/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@aw/logger';
import { Client } from '@hubspot/api-client';
import {
  CollectionResponseSimplePublicObjectWithAssociationsForwardPaging,
  SimplePublicObjectWithAssociations,
} from '@hubspot/api-client/lib/codegen/crm/objects/meetings';

export class Meeting {
  private client: Client;

  public constructor(client: Client) {
    this.client = client;
  }

  public async getAllMeetings(): Promise<CollectionResponseSimplePublicObjectWithAssociationsForwardPaging | void> {
    try {
      const limit = 10;
      const after = undefined;
      const properties = undefined;
      const propertiesWithHistory = undefined;
      const associations = undefined;
      const archived = false;

      const response = await this.client.crm.objects.meetings.basicApi.getPage(
        limit,
        after,
        properties,
        propertiesWithHistory,
        associations,
        archived
      );
      logger.info('Api response', { data: response });
      return response;
    } catch (e) {
      logger.error('Error on get meetings', { error: e?.message });
    }
  }

  public async getSingleMeeting(meetingId: string): Promise<SimplePublicObjectWithAssociations | void> {
    try {
      const properties = undefined;
      const propertiesWithHistory = undefined;
      const associations = undefined;
      const archived = false;
      const idProperty = undefined;

      const response = await this.client.crm.objects.meetings.basicApi.getById(
        meetingId,
        properties,
        propertiesWithHistory,
        associations,
        archived,
        idProperty
      );
      logger.info('Api response', { data: response });
      return response;
    } catch (e) {
      logger.error('Error on get single meeting', { error: e?.message });
    }
  }
}
