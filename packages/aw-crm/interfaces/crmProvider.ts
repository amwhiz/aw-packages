import { AuthService, ContactService, FormService, MeetingService, OwnerService, SignatureService } from './crmServices';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CRMProvider {
  auth(): AuthService;
  contact(): ContactService;
  signature(): SignatureService;
  form(): FormService;
  meeting(): MeetingService;
  owner(): OwnerService;
}
