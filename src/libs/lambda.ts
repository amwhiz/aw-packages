/* eslint-disable arrow-body-style */
import middy, { MiddyfiedHandler } from '@middy/core';
import { AWS } from '@serverless/typescript';
import { apiGatewayResponseMiddleware } from 'src/infrastructures/middleware/apiGatewayResponse.middleware';
import { customJsonBodyParserMiddleware } from 'src/infrastructures/middleware/customJsonBodyParser.middleware';

export const middyfy = (handler): MiddyfiedHandler => {
  return middy(handler)
    .use(customJsonBodyParserMiddleware())
    .use(apiGatewayResponseMiddleware({ enableErrorLogger: true }));
};
export type AWSFunction = AWS['functions'][0];
