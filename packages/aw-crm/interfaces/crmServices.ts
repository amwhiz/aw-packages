import { PublicAssociationsForObject } from '@hubspot/api-client/lib/codegen/crm/contacts';
import { RefreshTokenRequest, TokenResponse } from '../aw-hubspot/services/interfaces/auth';
import { ISignatureOptions } from '../interfaces/signature';
import { PagingType } from '../aw-hubspot/services/types/responseType';

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

export interface SignatureService {
  isValid(ISignatureOptions: ISignatureOptions): boolean;
}
