import { main } from '@functions/getUserById/handler';
import { APIGatewayProxyResult } from 'aws-lambda';
import mock from './mock';
test('Invalid Id is passed in path Parameters, should return a response 404 with empty user', async () => {
  let response: APIGatewayProxyResult = <APIGatewayProxyResult>(
    await main(mock, null, null)
  );
  expect(response.statusCode).toBe(404);
  expect(typeof response.body).toBe('string');
  expect(JSON.parse(response.body).User).toMatchObject({});
});
