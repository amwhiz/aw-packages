import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AppError } from '@libs/api.error';
import { logger } from '@aw/logger';
import { sendResponse } from '@libs/api-gateway';
import MiddlewareFunction = middy.MiddlewareFn;
/**
 * Creates middleware for handling API Gateway responses and errors.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiGatewayResponseMiddleware = (options: { enableErrorLogger?: boolean } = {}): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const after: MiddlewareFunction<APIGatewayProxyEvent, any> = async (request) => {
    if (!request.event?.httpMethod || request.response === undefined || request.response === null) {
      return;
    }

    const existingKeys = Object.keys(request.response);
    const isHttpResponse = existingKeys.includes('statusCode') && existingKeys.includes('headers') && existingKeys.includes('body');

    if (isHttpResponse) {
      return;
    }

    request.response = sendResponse({ data: request.response?.message }, request.response?.statusCode);
  };

  const onError: MiddlewareFunction<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
    const { error } = request;
    let statusCode = 200;

    if (error instanceof AppError) {
      // when throw error from application middleware catch and log it
      statusCode = error.statusCode;
    }

    if (options.enableErrorLogger) {
      logger.error(`${JSON.stringify(error?.message)}`);
    }

    request.response = sendResponse({ message: error?.message }, statusCode) as APIGatewayProxyResult;
  };

  return {
    after,
    onError,
  };
};
