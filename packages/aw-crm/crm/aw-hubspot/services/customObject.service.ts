import { Client } from '@hubspot/api-client';
import { defaultPagingResults } from '../constants/paging';
import { PagingType } from '../types/responseType';
import { PublicAssociationsForObject, PublicObjectSearchRequest } from '@hubspot/api-client/lib/codegen/crm/companies';
import { SimplePublicObjectInputForCreate, SimplePublicObjectInput } from '@hubspot/api-client/lib/codegen/crm/objects';
import { CustomObjectService } from '../../../interfaces/crmServices';
export { PublicAssociationsForObject, PublicObjectSearchRequest, FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/companies';

/** For More Info Contacts: https://developers.hubspot.com/docs/api/crm/custom-object */
export class CustomObject implements CustomObjectService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async get<O>(
    objectType: string,
    id: string,
    properties: string[],
    associations: string[] = undefined,
    idProperty: string | undefined = undefined
  ): Promise<O | undefined> {
    try {
      const response = await this.client.crm.objects.basicApi.getById(objectType, id, properties, [], associations, false, idProperty);
      return { ...response?.properties, id: response.id } as O;
    } catch (e) {
      return;
    }
  }

  async getAll<O>(
    objectType: string,
    limit: number = 100,
    after?: string,
    properties: string[] = [],
    associations: string[] = []
  ): Promise<PagingType<O>> {
    try {
      return (await this.client.crm.objects.basicApi.getPage(objectType, limit, after, properties, [], associations)) as PagingType<O>;
    } catch (e) {
      return defaultPagingResults;
    }
  }

  async create<O>(objectType: string, properties: O, associations: PublicAssociationsForObject[]): Promise<O | undefined> {
    const createRequest: SimplePublicObjectInputForCreate = {
      associations,
      properties: properties as { [key: string]: string },
    };
    try {
      const response = await this.client.crm.objects.basicApi.create(objectType, createRequest);
      return { ...response?.properties, id: response.id } as O;
    } catch (e) {
      return;
    }
  }

  async update<O>(objectType: string, id: string, properties: O, idProperty?: string | undefined): Promise<O | undefined> {
    const updateRequest: SimplePublicObjectInput = {
      properties: properties as { [key: string]: string },
    };
    try {
      const response = await this.client.crm.objects.basicApi.update(objectType, id, updateRequest, idProperty);
      return { ...response?.properties, id: response.id } as O;
    } catch (e) {
      return;
    }
  }

  async delete(objectType: string, id: string): Promise<void> {
    try {
      await this.client.crm.objects.basicApi.archive(objectType, id);
    } catch (e) {
      return;
    }
  }

  async search<O>(objectType: string, searchProp: PublicObjectSearchRequest): Promise<O | undefined> {
    try {
      const response = (await this.client.crm.objects.searchApi.doSearch(objectType, searchProp)).results[0];
      return { ...response?.properties, id: response?.id } as O;
    } catch (e) {
      return;
    }
  }
}
