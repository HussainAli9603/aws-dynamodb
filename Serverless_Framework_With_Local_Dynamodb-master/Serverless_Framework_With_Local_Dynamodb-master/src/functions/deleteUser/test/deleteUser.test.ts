import { main } from '@functions/deleteUser/handler';
import { APIGatewayProxyResult } from 'aws-lambda';
import mock from './mock';
test('Id is passed in path Parameters, should return a response 200', async () => {
  let response: APIGatewayProxyResult = <APIGatewayProxyResult>(
    await main(mock, null, null)
  );
  expect(response.statusCode).toBe(200);
  expect(typeof response.body).toBe('string');
});
