import {
  AssociationSpec,
  BatchInputSimplePublicObjectInputForCreate,
  BatchResponseSimplePublicObject,
  PublicAssociationsForObject,
  PublicObjectSearchRequest,
} from '@hubspot/api-client/lib/codegen/crm/companies';
import { ISignatureOptions } from '../interfaces/signature';
import { RefreshTokenRequest, TokenResponse } from '../crm/aw-hubspot/interfaces/auth';
import { PagingType } from '../crm/aw-hubspot/types/responseType';
import { ArchivedType, OwnerIdProperty } from '../crm/aw-hubspot/types/commonType';
import { FormTypes } from '../crm/aw-hubspot/types/formType';

export interface AuthService {
  token(tokenRequest: RefreshTokenRequest): Promise<TokenResponse | undefined>;
  tokenInfo(token: string): Promise<TokenResponse | undefined>;
}

export interface ContactService {
  get<O>(id: string, properties: string[], associations: string[] | undefined, idProperty?: string | undefined): Promise<O | undefined>;
  getAll<O>(limit: number, after: string, properties: string[], associations: string[]): Promise<PagingType<O> | undefined>;
  create<O>(properties: O, associations: PublicAssociationsForObject[] | undefined): Promise<O | undefined>;
  update<O>(id: string, properties: { [key: string]: string }, idProperty?: string | undefined): Promise<O | undefined>;
  delete(id: string): Promise<void>;
}

export interface DealService {
  get<O>(id: string, properties: string[], associations: string[], idProperty?: string | undefined): Promise<O | undefined>;
  getAll<O>(limit: number, after: string, properties: string[], associations: string[]): Promise<PagingType<O> | undefined>;
  create<O>(properties: O, associations: PublicAssociationsForObject[]): Promise<O | undefined>;
  update<O>(id: string, properties: O, idProperty?: string | undefined): Promise<O | undefined>;
  delete(id: string): Promise<void>;
}

export interface SignatureService {
  isValid(ISignatureOptions: ISignatureOptions): boolean;
}

export interface FormService {
  getAll<O>(limit?: number, after?: string, archived?: ArchivedType, formTypes?: FormTypes): Promise<PagingType<O>>;
  get<O>(id: string, properties: string[], associations: string[], idProperty?: string | undefined): Promise<O | undefined>;
}

export interface MeetingService {
  getAll<O>(limit?: number, after?: string, properties?: string[], associations?: string[]): Promise<PagingType<O>>;
  get<O>(id: string, properties: string[], associations: string[], idProperty?: string | undefined): Promise<O | undefined>;
}

export interface OwnerService {
  getAll<O>(limit?: number, after?: string, email?: string, archived?: ArchivedType): Promise<PagingType<O>>;
  get<O>(id: number, archived?: ArchivedType, idProperty?: OwnerIdProperty): Promise<O | undefined>;
}

export interface CustomObjectService {
  get<O>(objectType: string, id: string, properties: string[], associations: string[], idProperty?: string | undefined): Promise<O | undefined>;
  getAll<O>(objectType: string, limit: number, after: string, properties: string[], associations: string[]): Promise<PagingType<O> | undefined>;
  create<O>(objectType: string, properties: O, associations: PublicAssociationsForObject[]): Promise<O | undefined>;
  update<O>(objectType: string, id: string, properties: O, idProperty?: string | undefined): Promise<O | undefined>;
  delete(objectType: string, id: string): Promise<void>;
  search<O>(objectType: string, searchProp: PublicObjectSearchRequest): Promise<O | undefined>;
}

export interface LineItemService {
  get<O>(id: string, properties: string[], associations: string[], idProperty?: string | undefined): Promise<O | undefined>;
  getAll<O>(limit: number, after: string, properties: string[], associations: string[]): Promise<PagingType<O> | undefined>;
  create<O>(properties: O, associations: PublicAssociationsForObject[]): Promise<O | undefined>;
  update<O>(id: string, properties: O, idProperty?: string | undefined): Promise<O | undefined>;
  delete(id: string): Promise<void>;
  batchCreate(lineItems: BatchInputSimplePublicObjectInputForCreate): Promise<BatchResponseSimplePublicObject | undefined>;
}

export interface AssociationService {
  create(objectType: string, objectId: string, toObjectType: string, toObjectId: string, AssociationSpec: AssociationSpec[]): Promise<void>;
  delete(objectType: string, objectId: string, toObjectType: string, toObjectId: string): Promise<void>;
}
