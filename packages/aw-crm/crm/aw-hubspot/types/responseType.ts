import { Paging } from '@hubspot/api-client/lib/codegen/crm/companies';
export { PublicAssociationsForObject, AssociationSpecAssociationCategoryEnum } from '@hubspot/api-client/lib/codegen/crm/contacts';

export type IdResponseType = {
  id: string;
};

export type PagingType<T> = {
  paging: Paging;
  results: T[];
};
