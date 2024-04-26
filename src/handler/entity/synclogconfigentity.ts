import DynamoDB from '@aw/dynamodb';
import { env } from '@aw/env';
import { Table, Entity } from 'dynamodb-toolbox';

const client = new DynamoDB();
const tableName = env('syncLogTable');

const syncConfigTable = new Table({
  name: tableName,
  partitionKey: 'pk',
  sortKey: 'sk',
  DocumentClient: client.dynamoDBClient(),
});

export const syncLogConfigEntity = new Entity({
  name: tableName,
  attributes: {
    pk: { partitionKey: true, type: 'string' },
    sk: { sortKey: true, type: 'string', default: () => new Date().getTime() },
    method: { type: 'string' },
    url: { type: 'string' },
    requestPayload: { type: 'string' },
    response: { type: 'string' },
    requestTime: { type: 'number' },
    responseTime: { type: 'number' },
    totalTime: { type: 'number' },
    statusCode: { type: 'number' },
  },
  table: syncConfigTable,
} as const);
