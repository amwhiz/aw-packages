import { Entity, Table } from 'dynamodb-toolbox';
import DynamoDBClient from '@aw/dynamodb';
import { env } from '@aw/env';

const client = new DynamoDBClient();
const TableName = `${env('stage')}-schedule-logs`;

const ScheduleLogTable = new Table({
  name: TableName,
  partitionKey: 'pk',
  sortKey: 'sk',
  DocumentClient: client.dynamoDBClient(),
});

export const ScheduleLogEntity = new Entity({
  name: TableName,
  attributes: {
    pk: { partitionKey: true },
    sk: { hidden: true, sortKey: true },
    Method: { type: 'string' },
    Url: { type: 'string' },
    RequestPayload: { type: 'string' },
    Response: { type: 'string' },
    RequestTime: { type: 'string' },
    ResponseTime: { type: 'string' },
    TotalTime: { type: 'string' },
    StatusCode: { type: 'number' },
  },
  table: ScheduleLogTable,
} as const);
