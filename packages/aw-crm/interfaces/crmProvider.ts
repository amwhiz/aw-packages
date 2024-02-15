import { AuthService, ContactService, SignatureService } from './crmServices';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CRMProvider {
  auth(): AuthService;
  contact(): ContactService;
  signature(): SignatureService;
}
