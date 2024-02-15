import { PublicAssociationsForObject } from '@hubspot/api-client/lib/codegen/crm/contacts';
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
  get<O>(id: string, properties: string[], associations: string[], idProperty?: string | undefined): Promise<O | undefined>;
  getAll<O>(limit: number, after: string, properties: string[], associations: string[]): Promise<PagingType<O> | undefined>;
  create<O>(properties: { [key: string]: string }, associations: PublicAssociationsForObject[]): Promise<O | undefined>;
  update<O>(id: string, properties: { [key: string]: string }, idProperty?: string | undefined): Promise<O | undefined>;
  delete(id: string): Promise<void>;
}

export interface DealService {
  get<O>(id: string, properties: string[], associations: string[], idProperty?: string | undefined): Promise<O | undefined>;
  getAll<O>(limit: number, after: string, properties: string[], associations: string[]): Promise<PagingType<O> | undefined>;
  create<O>(properties: { [key: string]: string }, associations: PublicAssociationsForObject[]): Promise<O | undefined>;
  update<O>(id: string, properties: { [key: string]: string }, idProperty?: string | undefined): Promise<O | undefined>;
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
