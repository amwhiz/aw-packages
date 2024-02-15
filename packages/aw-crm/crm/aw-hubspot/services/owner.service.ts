import { Client } from '@hubspot/api-client';
import { OwnerService } from '../../../interfaces/crmServices';
import { defaultPagingResults } from '../constants/paging';
import { PagingType } from '../types/responseType';
import { ArchivedType, OwnerIdProperty, StrOrUndefinedType } from '../types/commonType';

/** For More info Owners: https://developers.hubspot.com/docs/api/crm/owners */
export class Owner implements OwnerService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getAll<O>(
    limit: number = 100,
    after?: StrOrUndefinedType,
    email: StrOrUndefinedType = undefined,
    archived: ArchivedType = false
  ): Promise<PagingType<O>> {
    try {
      const response = await this.client.crm.owners.ownersApi.getPage(email, after, limit, archived);
      return response as PagingType<O>;
    } catch (e) {
      return defaultPagingResults;
    }
  }

  async get<O>(id: number, archived: ArchivedType = false, idProperty: OwnerIdProperty = 'id'): Promise<O | undefined> {
    try {
      const response = await this.client.crm.owners.ownersApi.getById(id, idProperty, archived);
      return response as O;
    } catch (e) {
      return;
    }
  }
}
