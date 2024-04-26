import middy from '@middy/core';
import MiddlewareFunction = middy.MiddlewareFn;
import { APIGatewayProxyEvent, SQSHandler } from 'aws-lambda';
import { logger } from '@aw/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const customJsonBodyParserMiddleware = (): any => {
  logger.info('Custom JSON Body Parser');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const before: MiddlewareFunction<APIGatewayProxyEvent, SQSHandler, any> = async (handler) => {
    logger.info(`Headers: ${JSON.stringify(handler.event.headers)}`);
    if ((handler?.event?.headers && handler.event.headers?.['Content-Type']) || handler.event.headers?.['content-type']) {
      const contentType = handler?.event?.headers?.['Content-Type'] ?? handler.event.headers?.['content-type'];
      // Handle only JSON content types
      if (contentType.startsWith('application/json')) {
        // Parse the JSON body manually
        handler.event.body = JSON.parse(handler.event.body);
      }
    } else {
      // Parse the SQS JSON body manually
      handler.event['Records'][0].body = JSON.parse(handler.event['Records'][0].body);
    }
  };

  return {
    before,
  };
};
