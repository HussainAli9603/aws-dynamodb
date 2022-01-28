import type { AWS } from '@serverless/typescript';

import { putObject } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'serverlesss3',
  frameworkVersion: '2',
  custom: {
    s3: {
      address: 'localhost',
      port: 4569,
      directory: './buckets',
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
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-s3-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { putObject },
  resources: {
    Resources: {
      test: {
        Type: 'AWS:S3::Bucket',
        Properties: {
          BucketName: 'test',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
