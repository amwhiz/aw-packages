import { CRMProvider } from './interfaces/crmProvider';
import {
  AssociationService,
  AuthService,
  ContactService,
  CustomObjectService,
  DealService,
  FormService,
  LineItemService,
  MeetingService,
  OwnerService,
  SignatureService,
} from './interfaces/crmServices';

// Abstract class providing a base implementation for PaymentProvider
export abstract class BaseCRMProvider implements CRMProvider {
  abstract auth(): AuthService;
  abstract signature(): SignatureService;
  abstract owner(): OwnerService;
  abstract contact(): ContactService;
  abstract deal(): DealService;
  abstract lineItem(): LineItemService;
  abstract form(): FormService;
  abstract meeting(): MeetingService;
  abstract customObject(): CustomObjectService;
  abstract association(): AssociationService;
}
