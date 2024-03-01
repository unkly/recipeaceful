import { AppSyncResolverEvent, Context } from 'aws-lambda'

export const mockEvent = (args: any, fieldName: string): AppSyncResolverEvent<any, unknown> => {
  return {
    arguments: args,
    info: {
      fieldName: fieldName,
      variables: {},
      parentTypeName: 'Mutation',
      selectionSetList: ['result'],
      selectionSetGraphQL: '{\n  result\n}'
    },
    request: {
      headers: {
        host: 'localhost:20002',
        connection: 'keep-alive',
        'content-length': '169',
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        accept: 'application/json',
        'content-type': 'application/json',
        'sec-ch-ua-mobile': '?0',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'x-api-key': 'da2-fakeApiId123456',
        'sec-ch-ua-platform': '"Windows"',
        origin: 'http://localhost:20002',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        referer: 'http://localhost:20002/',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'ja,en-US;q=0.9,en;q=0.8'
      },
      domainName: 'localhost'
    },
    identity: null,
    stash: {},
    source: null,
    prev: null
  }
}

export const mockContext: Context = {
  awsRequestId: 'e9a94f65-c620-4c8d-a614-c9e946aaead1',
  callbackWaitsForEmptyEventLoop: true,
  clientContext: undefined,
  functionName: 'test-dev-LambdaFunction',
  functionVersion: '$LATEST',
  identity: undefined,
  invokedFunctionArn: 'offline_invokedFunctionArn_for_test-dev-LambdaFunction',
  logGroupName: 'offline_logGroupName_for_test-dev-LambdaFunction',
  logStreamName: 'offline_logStreamName_for_test-dev-LambdaFunction',
  memoryLimitInMB: '1024',
  done: () => {},
  fail: () => {},
  getRemainingTimeInMillis: () => 1,
  succeed: () => {}
}

export const mockCallback = () => {}
