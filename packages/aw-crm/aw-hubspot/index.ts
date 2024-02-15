import IConfiguration from '@hubspot/api-client/lib/src/configuration/IConfiguration';
import { BaseCRMProvider } from '../base';
import { Client } from '@hubspot/api-client';
import { Auth } from './services/auth/auth.service';
import { Contact } from './services/contact/contact.service';
import { Signature } from './services/signature/signature.service';

export class HubspotCRM extends BaseCRMProvider {
  private client: Client;
  private _authService: Auth;
  private _contactService: Contact;
  private _signatureService: Signature;

  constructor(config?: IConfiguration) {
    super();
    this.client = new Client(config);
  }

  auth(): Auth {
    this._authService = new Auth(this.client);
    return this._authService;
  }

  contact(): Contact {
    this._contactService = new Contact(this.client);
    return this._contactService;
  }

  signature(): Signature {
    this._signatureService = new Signature();
    return this._signatureService;
  }
}
