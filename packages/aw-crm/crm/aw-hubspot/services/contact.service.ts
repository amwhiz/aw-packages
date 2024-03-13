import { Client } from '@hubspot/api-client';
import { ContactService } from '../../../interfaces/crmServices';
import { defaultPagingResults } from '../constants/paging';
import { PagingType } from '../types/responseType';
import { PublicAssociationsForObject } from '@hubspot/api-client/lib/codegen/crm/companies';
import { SimplePublicObjectInputForCreate, SimplePublicObjectInput } from '@hubspot/api-client/lib/codegen/crm/objects';

/** For More Info Contacts: https://developers.hubspot.com/docs/api/crm/contacts */
export class Contact implements ContactService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async get<O>(id: string, properties: string[], associations: string[] = undefined, idProperty?: string | undefined): Promise<O | undefined> {
    try {
      const response = await this.client.crm.contacts.basicApi.getById(id, properties, undefined, associations, false, idProperty);
      return { ...response?.properties, id: response.id } as O;
    } catch (e) {
      return;
    }
  }

  async getAll<O>(limit: number = 100, after?: string, properties: string[] = [], associations: string[] = []): Promise<PagingType<O>> {
    try {
      return (await this.client.crm.contacts.basicApi.getPage(limit, after, properties, [], associations)) as PagingType<O>;
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
      const response = await this.client.crm.contacts.basicApi.create(createRequest);
      return { ...response?.properties, id: response.id } as O;
    } catch (e) {
      return;
    }
  }

  async update<O>(id: string, properties: { [key: string]: string }, idProperty: string | undefined = undefined): Promise<O | undefined> {
    const updateRequest: SimplePublicObjectInput = {
      properties: properties,
    };
    try {
      const response = await this.client.crm.contacts.basicApi.update(id, updateRequest, idProperty);
      return { ...response?.properties, id: response.id } as O;
    } catch (e) {
      return;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.client.crm.contacts.basicApi.archive(id);
    } catch (e) {
      return;
    }
  }
}
