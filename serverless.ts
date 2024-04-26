/* eslint-disable no-undef */
import type { AWS } from '@serverless/typescript';
import { queueHandler, queueWorker, ping } from 'src/handler/event';

const serverlessConfiguration: AWS = {
  // Service name
  service: 'aw-packages',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    // Change your preferred region
    // https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html
    region: 'us-east-1',
    runtime: 'nodejs20.x',
    stage: '${opt:stage, "dev"}',
    versionFunctions: false,
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['lambda:InvokeFunction', 'lambda:InvokeAsync'],
        Resource: [
          {
            'Fn::Sub': 'arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:${self:service}-${self:provider.stage}-queueHandler',
          },
          {
            'Fn::Sub': 'arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:${self:service}-${self:provider.stage}-queueWorker',
          },
          {
            'Fn::Sub': 'arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:${self:service}-${self:provider.stage}-test',
          },
        ],
      },
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
          'dynamodb:BatchGetItem',
          'dynamodb:BatchWriteItem',
          'dynamodb:Query',
        ],
        Resource: [
          {
            'Fn::Sub': 'arn:aws:dynamodb:${AWS::Region}:${AWS::AccountId}:table/${self:provider.stage}-sync-log-config',
          },
        ],
      },
      {
        Effect: 'Allow',
        Action: ['sqs:ReceiveMessage', 'sqs:SendMessage', 'sqs:GetQueueAttributes'],
        Resource: { 'Fn::GetAtt': ['queueName', 'Arn'] },
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      SERVICE_NAME: '${self:service}',
      ENABLE_LOGGER: 'enablelogger',
      REGION: '${self:provider.region}',
      ACCESS_KEY: 'accesskey',
      SECRET_ACCESS_KEY: 'secretAccessKey',
      LAMBDA_URI: 'lambda url',
      QUEUE_URL: 'queueUrl',
      SYNC_TABLE_NAME: '${self:provider.stage}-sync-log-config',
    },
  },
  // import the function via paths
  functions: { queueHandler, queueWorker, ping },
  package: { individually: true },
  resources: {
    Resources: {
      totalExpertsSyncQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'queueName',
          FifoQueue: true,
          ContentBasedDeduplication: true,
          VisibilityTimeout: 60,
          MessageRetentionPeriod: 345600,
        },
      },
      syncLogDB: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:provider.stage}-sync-log-config',
          AttributeDefinitions: [
            {
              AttributeName: 'pk',
              AttributeType: 'S',
            },
            {
              AttributeName: 'sk',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'pk',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'sk',
              KeyType: 'RANGE',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10,
          },
        },
      },
    },
  },
  custom: {
    logRetentionInDays: 30,
    awsAccountId: 'accountId',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
