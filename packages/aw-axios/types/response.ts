/* eslint-disable @typescript-eslint/no-explicit-any */

export type ResponseType = {
  statusCode: number;
  error: string | object | any[];
  data?: string | object;
};
