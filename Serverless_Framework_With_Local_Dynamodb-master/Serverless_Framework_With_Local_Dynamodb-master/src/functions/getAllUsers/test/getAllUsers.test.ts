import { main } from '@functions/getAllUsers/handler';
import { APIGatewayProxyResult } from 'aws-lambda';
import mock from './mock';
test('Should return response with 200 and parsable string body', async () => {
  let response: APIGatewayProxyResult = <APIGatewayProxyResult>(
    await main(mock, null, null)
  );
  expect(response.statusCode).toBe(200);
  expect(typeof response.body).toBe('string');
  expect(typeof JSON.parse(response.body)).toBe('object');
});
