import { middyfy } from '@libs/lambda';
import { logger } from '@aw/logger';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { commonMessage } from 'src/infrastructures/constant/common.constant';
import { pushToQueue } from 'src/handler/services/webhook.handler.services';
import { WorkerService } from 'src/handler/services/webhook.worker.service';

const queueHandler = async (event: APIGatewayProxyEvent): Promise<object> => {
  logger.info('workHandler');
  const { body } = event;
  logger.info(`Total webhook events: ${body?.length}`);
  await pushToQueue(body);
  return { message: commonMessage.successMsg };
};

const queueWorker = async (event): Promise<boolean> => {
  logger.info('worker');
  logger.info(JSON.stringify(event));
  const data = event.Records[0].body;
  const workerService = new WorkerService(data);
  await workerService.webhookHandlerLambda();
  return true;
};

const ping = async (event): Promise<object> => {
  const requestBody = event.body;
  if (requestBody.body === 'ping') {
    return { message: 'pong' };
  }
  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Invalid request' }),
  };
};

export const webhookHandler = middyfy(queueHandler);
export const webhookWorker = middyfy(queueWorker);
export const pingPong = middyfy(ping);
