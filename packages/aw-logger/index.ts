import { Logger, injectLambdaContext } from '@aws-lambda-powertools/logger';
import { env } from '@aw/env';
import { LogLevel } from '@aws-lambda-powertools/logger/lib/types';

const loggerConfiguration = { serviceName: env('serviceName') as string, logLevel: 'debug' as LogLevel };

export const logger = new Logger(loggerConfiguration);

export const injectLambda = injectLambdaContext;

export const LoggerService = Logger;
