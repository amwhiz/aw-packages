/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from '@hubspot/api-client';
import { defaultPagingResults } from '../constants/paging';
import { MeetingService } from '../../../interfaces/crmServices';
import { PagingType } from '../types/responseType';

export class Meeting implements MeetingService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getAll<O>(limit: number = 10, after: string, properties: string[] = [], associations: string[] = []): Promise<PagingType<O>> {
    try {
      const response = await this.client.crm.objects.meetings.basicApi.getPage(limit, after, properties, [], associations);
      return response as PagingType<O>;
    } catch (e) {
      return defaultPagingResults;
    }
  }

  public async get<O>(id: string, properties: string[], associations: string[], idProperty?: string | undefined): Promise<O | undefined> {
    try {
      const response = await this.client.crm.objects.meetings.basicApi.getById(id, properties, [], associations, false, idProperty);
      return response as O;
    } catch (e) {
      return;
    }
  }
}
