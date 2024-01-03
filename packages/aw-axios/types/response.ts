/* eslint-disable @typescript-eslint/no-explicit-any */

export type ResponseType = {
  status: number;
  error: string | object | any[];
  data?: string | object;
  headers: { 'request-startTime'?: number; 'request-endTime'?: number; 'request-duration'?: number };
};
