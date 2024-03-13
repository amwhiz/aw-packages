import { Client } from '@hubspot/api-client';
import { DealService } from '../../../interfaces/crmServices';
import { PublicAssociationsForObject, SimplePublicObjectInput, SimplePublicObjectInputForCreate } from '@hubspot/api-client/lib/codegen/crm/contacts';
import { defaultPagingResults } from '../constants/paging';
import { PagingType } from '../types/responseType';

/** For More info Deal: https://developers.hubspot.com/docs/api/crm/deals */
export class Deal implements DealService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async get<O>(id: string, properties: string[], associations: string[] = [], idProperty?: string | undefined): Promise<O | undefined> {
    try {
      const response = await this.client.crm.deals.basicApi.getById(id, properties, [], associations, false, idProperty);
      return { ...response?.properties, id: response.id } as O;
    } catch (e) {
      return;
    }
  }

  async getAll<O>(limit: number = 100, after?: string, properties: string[] = [], associations: string[] = []): Promise<PagingType<O>> {
    try {
      return (await this.client.crm.deals.basicApi.getPage(limit, after, properties, [], associations)) as PagingType<O>;
    } catch (e) {
      return defaultPagingResults;
    }
  }

  async create<O>(properties: O, associations: PublicAssociationsForObject[]): Promise<O | undefined> {
    const createRequest: SimplePublicObjectInputForCreate = {
      associations,
      properties: properties as { [key: string]: string },
    };
    try {
      const response = await this.client.crm.deals.basicApi.create(createRequest);
      return { ...response?.properties, id: response.id } as O;
    } catch (e) {
      return;
    }
  }

  async update<O>(id: string, properties: O, idProperty?: string | undefined): Promise<O | undefined> {
    const updateRequest: SimplePublicObjectInput = {
      properties: properties as { [key: string]: string },
    };
    try {
      const response = await this.client.crm.deals.basicApi.update(id, updateRequest, idProperty);
      return { ...response?.properties, id: response.id } as O;
    } catch (e) {
      return;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.client.crm.deals.basicApi.archive(id);
    } catch (e) {
      return;
    }
  }
}
