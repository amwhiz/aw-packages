/* eslint-disable @typescript-eslint/no-explicit-any */
import { SchedulerClient, CreateScheduleCommand, CreateScheduleCommandInput, CreateScheduleCommandOutput } from '@aws-sdk/client-scheduler';
import { env } from '@aw/env';
import { ScheduleType } from './types/schedule';
import { ScheduleTargetEnum } from './enums/scheduleTarget';
import DynamoDBClient from '@aw/dynamodb';
import { SchedulerAttributes } from './interfaces/scheduler';
import { ScheduleLogEntity } from './entity/scheduler';
import { Method } from '@aw/axios/enums/methods';
import { safeStringify } from '@aw/libs';

export default class EventBridgeSchedulerClient {
  private scheduler: SchedulerClient;
  private dynamoDBClient: DynamoDBClient;

  constructor() {
    this.scheduler = new SchedulerClient({
      credentials: {
        accessKeyId: env('accessKey'),
        secretAccessKey: env('secretAccessKey'),
      },
      region: env('region'),
    });
    this.dynamoDBClient = new DynamoDBClient();
  }

  private getScheduleCommand<T>(payload: ScheduleType<T>): CreateScheduleCommandInput {
    const command: CreateScheduleCommandInput = {
      Name: payload.name,
      Description: payload.description ?? 'MyScheduleEvent',
      State: 'ENABLED',
      ScheduleExpression: `at(${payload.scheduleExpressAt})`, // Schedule expression at(yyyy-mm-ddThh:mm:ss)
      ScheduleExpressionTimezone: 'UTC',
      FlexibleTimeWindow: {
        Mode: 'OFF',
      },
      Target: {
        RoleArn: env('schedulerRoleArn'), // Policy Arn
        RetryPolicy: {
          MaximumEventAgeInSeconds: 86400,
          MaximumRetryAttempts: 185,
        },
        Arn: env('schedulerTargetArn'),
        Input: JSON.stringify(Object.assign(payload?.data ?? {}, { schedule: true })),
      },
      ActionAfterCompletion: payload.ActionAfterCompletion,
    };

    if (payload.scheduleTargetType === ScheduleTargetEnum.SQS) {
      command.Target['SqsParameters'] = {
        MessageGroupId: payload?.messageGroupId,
      };
    }

    return command;
  }

  private async handlerError(
    _responsePayload: any,
    _requestPayload: any,
    _requestUrl: string | URL,
    method: Method,
    email: string,
    time
  ): Promise<any> {
    // Handle your DB log Here
    const createLog: SchedulerAttributes = {
      pk: email,
      sk: `${new Date().getTime()}`,
      Method: method as string,
      RequestPayload: safeStringify(_requestPayload || {}),
      RequestTime: time?.requestTime,
      ResponseTime: time?.responseTime,
      TotalTime: time?.requestDuration,
      Response: safeStringify(_responsePayload || _responsePayload?.message || {}),
      StatusCode: _responsePayload['statusCode'] || 200,
      Url: _requestUrl as string,
    };

    await this.dynamoDBClient.put<SchedulerAttributes>(ScheduleLogEntity, createLog);

    if (!_responsePayload?.['url']) {
      return {
        url: null,
      };
    }
  }

  async scheduleEvent<T>(payload: ScheduleType<T>): Promise<CreateScheduleCommandOutput> {
    const scheduleCommand = this.getScheduleCommand<T>(payload);
    const command = new CreateScheduleCommand(scheduleCommand);
    const requestTime = new Date().getTime();
    const event = await this.scheduler.send(command);
    const responseTime = new Date().getTime();
    const requestDuration = responseTime - requestTime;
    const time = {
      requestTime,
      responseTime,
      requestDuration,
    };
    await this.handlerError(event, command, null, null, payload.data?.['email'] || 'scheduler', time);
    return event;
  }
}
