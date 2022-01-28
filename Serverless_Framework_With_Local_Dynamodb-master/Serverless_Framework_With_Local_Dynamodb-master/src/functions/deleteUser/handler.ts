import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import {
  _200_formatJSONResponse,
  _400_formatJSONResponse,
} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { DynameDb } from '../../common/dynamo.class';

import schema from './schema';

const deleteRecordById: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    try {
      let record = await new DynameDb(
        process.env.IS_OFFLINE,
        'Users'
      ).deleteRecordById(event.pathParameters?.id);
      return _200_formatJSONResponse({
        Deleted_User: record,
      });
    } catch (e) {
      return _400_formatJSONResponse({
        Error: e,
      });
    }
  };

export const main = middyfy(deleteRecordById);
