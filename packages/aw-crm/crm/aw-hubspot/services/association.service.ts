import { Client } from '@hubspot/api-client';
import { AssociationSpec } from '@hubspot/api-client/lib/codegen/crm/companies';
export { AssociationSpec } from '@hubspot/api-client/lib/codegen/crm/companies';
import { AssociationService } from '@aw/crm/interfaces/crmServices';

/** For More Info Contacts: https://developers.hubspot.com/docs/api/crm/associations */
export class Association implements AssociationService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async create(objectType: string, objectId: string, toObjectType: string, toObjectId: string, AssociationSpec: AssociationSpec[]): Promise<void> {
    try {
      await this.client.crm.associations.v4.basicApi.create(objectType, objectId, toObjectType, toObjectId, AssociationSpec);
    } catch (e) {
      return;
    }
  }

  async delete(objectType: string, objectId: string, toObjectType: string, toObjectId: string): Promise<void> {
    try {
      await this.client.crm.associations.v4.basicApi.archive(objectType, objectId, toObjectType, toObjectId);
    } catch (e) {
      return;
    }
  }
}
