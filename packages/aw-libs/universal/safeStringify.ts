import { LoggerService } from '@aw/logger';

export const safeStringify = (payload: object): string => {
  const logger = new LoggerService({ serviceName: safeStringify.name });
  try {
    return JSON.stringify(payload);
  } catch (e) {
    // eslint-disable-next-line no-console
    logger.error('Error stringifying object:', e);
    // Return a default or meaningful value in case of an error
    return 'Error during stringification';
  }
};
