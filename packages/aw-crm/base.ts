import { CRMProvider } from './interfaces/crmProvider';
import { AuthService, ContactService, FormService, MeetingService, OwnerService, SignatureService } from './interfaces/crmServices';

// Abstract class providing a base implementation for PaymentProvider
export abstract class BaseCRMProvider implements CRMProvider {
  abstract auth(): AuthService;
  abstract contact(): ContactService;
  abstract signature(): SignatureService;
  abstract form(): FormService;
  abstract meeting(): MeetingService;
  abstract owner(): OwnerService;
}
