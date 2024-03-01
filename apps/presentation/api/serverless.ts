import type { AWS } from '@serverless/typescript'
import * as path from 'path'

const serverlessConfiguration: AWS = {
  service: 'test',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-appsync-plugin', 'serverless-appsync-simulator'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    stage: '${opt:stage, self:custom.defaultStage}',
    region: 'ap-northeast-1',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: 'ses:*',
            Resource: '*'
          }
        ]
      }
    },
    environment: {
      NODE_ENV: process.env.NODE_ENV || ''
    }
  },
  functions: {
    LambdaFunction: {
      handler: 'src/handler.handler',
      timeout: 300,
      events: [
        {
          http: {
            path: '/graphql',
            method: 'post',
            cors: true
          }
        }
      ]
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node20',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10
    },
    defaultStage: 'dev',
    accountId: {
      dev: 845415451667,
      st: 845415451667
    },
    'appsync-simulator': {
      location: '.esbuild/.build',
      watch: false,
      apiKey: 'da2-fakeApiId123456',
      port: process.env.API_PORT
    },
    appSync: {
      name: '${opt:stage, self:custom.defaultStage}-api',
      authenticationType: 'API_KEY',
      schema: path.join(__dirname, 'schema', 'schema.graphql'),
      apiKeys: [
        {
          name: 'test appsync',
          expiresAfter: '356d'
        }
      ],
      defaultMappingTemplates: {
        request: 'request.vtl',
        response: 'response.vtl'
      },
      mappingTemplates: [
        {
          dataSource: 'LambdaFunction',
          type: 'Mutation',
          field: 'registerUser'
        }
      ],
      dataSources: [
        {
          type: 'AWS_LAMBDA',
          name: 'LambdaFunction',
          config: {
            functionName: 'LambdaFunction'
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration
