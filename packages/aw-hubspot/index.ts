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

  public async refreshAccessToken(event: credentialType): Promise<any> {
    const url = event?.hubspotBaseUrl;
    const data = {
      grant_type: 'refresh_token',
      client_id: event?.client_id,
      client_secret: event?.client_secret,
      redirect_uri: event?.client_secret,
      refresh_token: event?.refresh_token,
    };
    logger.info('refreshAccessToken: Credential Data', { data });

    try {
      const response: AxiosResponse<any> = await axios.post(url, new URLSearchParams(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      });
      return response;
    } catch (error: any) {
      logger.error('Error refreshing access token:', error.message);
      throw error;
    }
  }
}
