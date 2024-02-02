/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from '@hubspot/api-client';
import { CRM } from './crm';
import { logger } from '@aw/logger';
import { credentialType } from './types/credential';
import axios, { AxiosResponse } from 'axios';

export class HubspotCRM {
  protected _crm: CRM | undefined;
  protected client: Client;

  constructor(token: string) {
    this.client = new Client({ accessToken: token });
    this.init();
  }

  private init(): void {
    this._crm = undefined;
  }

  // hubspot class
  get crm(): CRM | undefined {
    if (!this._crm) this._crm = new CRM(this.client);
    return this._crm;
  }
}
