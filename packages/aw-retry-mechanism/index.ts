import { StatusCodes } from './enums/statusCodes';
import { get } from 'lodash';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class RetryMechanism {
  public readonly retryTimeout = {
    MAX_RETRY: 10,
    INTERNAL_SERVER_ERROR: 200,
    TOO_MANY_REQUESTS: 10 * 1000,
  };

  protected numberOfApiCallRetries: number;

  public constructor(numberOfApiCallRetries: number) {
    this.numberOfApiCallRetries = numberOfApiCallRetries;
  }

  public retry(method: any): (...args: any) => any {
    return async (...args: any) => {
      const numberOfRetries = this.numberOfApiCallRetries;
      let resultSuccess: any;
      let resultRejected: any;

      for (let index = 1; index <= this.numberOfApiCallRetries; index++) {
        resultSuccess = await method(...args);
        if (index === this.retryTimeout.MAX_RETRY) {
          break;
        }

        if (index === numberOfRetries) {
          break;
        }

        const statusCode: number = get(resultSuccess, 'statusCode', 0);
        if (statusCode >= StatusCodes.BadRequest) {
          await this._waitAfterRequestFailure(statusCode, index, this.retryTimeout.INTERNAL_SERVER_ERROR);
          continue;
        }

        if (statusCode >= StatusCodes.MinServerError && statusCode <= StatusCodes.MaxServerError) {
          await this._waitAfterRequestFailure(statusCode, index, this.retryTimeout.INTERNAL_SERVER_ERROR);
          continue;
        }

        if (statusCode === StatusCodes.TooManyRequests) {
          await this._waitAfterRequestFailure(statusCode, index, this.retryTimeout.TOO_MANY_REQUESTS);
        }

        break;
      }

      return new Promise((resolve, reject) => {
        if (resultRejected) {
          return reject(resultRejected);
        }
        return resolve(resultSuccess);
      });
    };
  }

  protected _waitAfterRequestFailure(statusCode: number, retryNumber: number, retryTimeout: number): any {
    // eslint-disable-next-line no-console
    console.error(`Request failed with status code [${statusCode}], will retry [${retryNumber}] time in [${retryTimeout}] ms`);
    return new Promise((resolve) => setTimeout(resolve, retryTimeout * retryNumber));
  }
}
