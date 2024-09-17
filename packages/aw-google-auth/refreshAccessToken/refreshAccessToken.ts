/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@aw/env';
import { logger } from '@aw/logger';
import { AxiosResponse } from 'axios';
import { axiosClient } from '@aw/axios';

export class RefreshAccessToken {
  private payload: object;

  public constructor(client: object) {
    this.payload = client;
  }

  public async refreshAccessToken(): Promise<any> {
    const url = env('googleCalenderAuthUrl') as string;
    const data = this.payload;
    logger.info('RefreshAccessToken: Credential Data', { data });

    try {
      const response: AxiosResponse<any> = await axiosClient.post(url, new URLSearchParams(data as any), {
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
