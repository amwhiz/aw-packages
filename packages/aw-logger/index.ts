import { Logger, injectLambdaContext } from '@aws-lambda-powertools/logger';
import { env } from '@aw/env';

const loggerConfiguration = { serviceName: env('serviceName') as string };

export const logger = new Logger(loggerConfiguration);

export const injectLambda = injectLambdaContext;

export { Logger as LoggerService } from '@aws-lambda-powertools/logger';
