import type { AWS } from '@serverless/typescript';

import createUser from '@functions/createUser';
import deleteUser from '@functions/deleteUser';
import getAllUsers from '@functions/getAllUsers';
import getUserById from '@functions/getUserById';

const serverlessConfiguration: AWS = {
  service: 'dynamodb-crud-by-myasir',
  frameworkVersion: '2',
  custom: {
    dynamodb: {
      stages: ['live'],
      region: 'us-east-1',
      start: {
        port: 8000,
        migrate: true,
        inMemory: true,
        seed: true,
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dynamodb-local',
  ],
  provider: {
    stage: 'live',
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      AWS_ACCOUNT_ID: '218767131295',
      USER_TABLE: 'Users',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['dynamodb:*'],
        Resource:
          'arn:aws:dynamodb:${self:provider.region}:${self:provider.environment.AWS_ACCOUNT_ID}:table/${self:provider.environment.USER_TABLE}',
      },
    ],
  },
  // import the function via paths
  functions: { createUser, deleteUser, getAllUsers, getUserById },

  resources: {
    Resources: {
      Users: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'Users',
          BillingMode: 'PAY_PER_REQUEST',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
