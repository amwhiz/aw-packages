/* eslint-disable @typescript-eslint/no-unused-vars */
import { logger } from '@aw/logger';

export class WorkerService {
  constructor(payload) {
    const { data } = payload;
  }

  async webhookHandlerLambda(): Promise<void> {
    logger.info('data');
  }
}
