/* eslint-disable no-undef */
import IConfiguration from '@hubspot/api-client/lib/src/configuration/IConfiguration';
import { BaseCRMProvider } from '../../base';
import { Client } from '@hubspot/api-client';
import { Auth } from './services/auth.service';
import { Contact } from './services/contact.service';
import { Signature } from './services/signature.service';
import { Form } from './services/forms.service';
import { Meeting } from './services/meeting.service';

export class HubspotCRM extends BaseCRMProvider {
  private client: Client;
  private _authService: Auth;
  private _contactService: Contact;
  private _signatureService: Signature;
  private _formService: Form;
  private _meetingService: Meeting;
  private hubspotProviderIsTurnedOff: number = +(process.env.TURN_OFF_HUBSPOT_SERVICE || '0');

  constructor(config?: IConfiguration) {
    super();
    /* The code `if (this.hubspotProviderIsTurnedOff) throw new Error('Hubspot Provider is turn off');`
    is checking the value of the `hubspotProviderIsTurnedOff` variable. If the value is truthy (not
    equal to 0), it means that the Hubspot provider is turned off. In this case, it throws an error
    with the message 'Hubspot Provider is turn off'. This is a way to prevent the HubspotCRM class
    from being instantiated when the provider is turned off. */
    if (this.hubspotProviderIsTurnedOff) throw new Error('Hubspot Provider is turned off');
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

  form(): Form {
    this._formService = new Form(this.client);
    return this._formService;
  }

  meeting(): Meeting {
    this._meetingService = new Meeting(this.client);
    return this._meetingService;
  }
}
