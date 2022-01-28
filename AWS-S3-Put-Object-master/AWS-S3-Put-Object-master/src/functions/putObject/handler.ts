import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
// import { middyfy } from '@libs/lambda';
import * as multipart from 'aws-lambda-multipart-parser';
import * as AWS from 'aws-sdk';
export const main: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const s3 = new AWS.S3({
    s3ForcePathStyle: true,
    accessKeyId: 'S3RVER',
    secretAccessKey: 'S3RVER',
    endpoint: new AWS.Endpoint('http://localhost:4569'),
  });
  try {
    if (event.body == {} || event.body == undefined)
      throw new Error('BAD_REQUEST');

    if (event.isBase64Encoded) event.body = await event.body.toString('ascii');

    let parsed_body = await multipart.parse(event);

    let params = {
      Bucket: 'test',
      Key: parsed_body.file.filename,
      Body: Buffer.from(parsed_body.file.content, 'ascii'),
    };
    let response = await s3.putObject(params).promise();
    return formatJSONResponse(
      {
        response,
      },
      200
    );
  } catch (error) {
    if (error.message == 'BAD_REQUEST')
      return formatJSONResponse(
        {
          message: 'Invalid request body',
        },
        400
      );

    console.log(error);
  }
};

// export const main = middyfy(putObject);
