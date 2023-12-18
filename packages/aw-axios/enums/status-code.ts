/* eslint-disable no-unused-vars */

export const enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
  BadRequest = 400,
  'Bad Gateway' = 502,
  'Service Unavailable' = 503,
  Success = 200,
  Created = 201,
  'Not Found' = 404,
}
