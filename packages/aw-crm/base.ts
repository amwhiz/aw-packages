import { CRMProvider } from './interfaces/crmProvider';
import { AuthService, ContactService, SignatureService } from './interfaces/crmServices';

// Abstract class providing a base implementation for PaymentProvider
export abstract class BaseCRMProvider implements CRMProvider {
  abstract auth(): AuthService;
  abstract contact(): ContactService;
  abstract signature(): SignatureService;
}
