import {
  ValidatedEventAPIGatewayProxyEvent,
  _404_formatJSONResponse,
  _200_formatJSONResponse,
  _400_formatJSONResponse,
} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { DynameDb } from '../../common/dynamo.class';

import schema from './schema';

const getRecordById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    let record = await new DynameDb(
      process.env.IS_OFFLINE,
      'Users'
    ).getRecordById(event.pathParameters?.id);
    if (Object.keys(record).length == 0) {
      return _404_formatJSONResponse({
        User: record,
      });
    } else {
      return _200_formatJSONResponse({
        User: record,
      });
    }
  } catch (e) {
    return _400_formatJSONResponse({
      Error: e,
    });
  }
};

export const main = middyfy(getRecordById);
