/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@aw/env';
import { logger } from '@aw/logger';
import { AxiosResponse } from 'axios';
import { axiosClient } from '@aw/axios';
export class GetAccessToken {
  private payload: object;

  public constructor(client: object) {
    this.payload = client;
  }
  public async getAccessToken(): Promise<any> {
    const url = env('googleCalenderAuthUrl') as string;
    const data = this.payload;
    logger.info('GetAccessToken: Credential Data', { data });

    try {
      const response: AxiosResponse<any> = await axiosClient.post(url, new URLSearchParams(data as any), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      });
      return response;
    } catch (error: any) {
      logger.error('Error get access token:', error.message);
      throw error;
    }
  }
}
