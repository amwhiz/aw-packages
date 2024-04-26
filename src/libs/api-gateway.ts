/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { APIGatewayProxyEvent, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>>;

export const sendResponse = (response: Record<string, unknown>, statusCode = 200) => ({
    statusCode,
    headers: {
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,PUT,DELETE,PATCH',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(response),
  });
