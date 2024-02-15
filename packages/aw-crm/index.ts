import { BaseCRMProvider } from './base';
import { CRMProvider } from './interfaces/crmProvider';
import { AuthService, ContactService, FormService, MeetingService, OwnerService, SignatureService } from './interfaces/crmServices';

export class CRMProcessor implements BaseCRMProvider {
  private provider: CRMProvider;

  constructor(provider: CRMProvider) {
    this.provider = provider;
  }

  auth(): AuthService {
    return this.provider.auth();
  }

  contact(): ContactService {
    return this.provider.contact();
  }

  signature(): SignatureService {
    return this.provider.signature();
  }

  form(): FormService {
    return this.provider.form();
  }

  meeting(): MeetingService {
    return this.provider.meeting();
  }

  owner(): OwnerService {
    return this.provider.owner();
  }
}
