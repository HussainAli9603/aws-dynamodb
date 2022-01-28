import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
// import multipartBodyParser from '@middy/http-multipart-body-parser';

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser());
};
