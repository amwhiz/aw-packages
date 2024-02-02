/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from '@hubspot/api-client';
import { Form } from './forms/forms';
import { Meeting } from './meetings/meetings';

export class CRM {
  protected _meetings: Meeting | undefined;
  protected _forms: Form | undefined;
  protected client: Client;

  constructor(client: Client) {
    this.client = client;
    this.init();
  }

  private init(): void {
    this._meetings = undefined;
    this._forms = undefined;
  }

  // hubspot class
  get meeting(): Meeting | undefined {
    if (!this._meetings) this._meetings = new Meeting(this.client);
    return this._meetings;
  }
  get form(): Form | undefined {
    if (!this._forms) this._forms = new Form(this.client);
    return this._forms;
  }
}
