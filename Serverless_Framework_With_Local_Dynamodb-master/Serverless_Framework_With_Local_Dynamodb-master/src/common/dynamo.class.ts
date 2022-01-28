import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
export class DynameDb {
  client: any;
  table: string;
  constructor(IS_OFFLINE: string | boolean, table: string) {
    console.log(process.env);
    if (process.env.NODE_ENV == 'test') IS_OFFLINE = true;
    if (IS_OFFLINE) {
      let options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      };
      this.client = new AWS.DynamoDB.DocumentClient(options);
    } else {
      this.client = new AWS.DynamoDB.DocumentClient();
    }

    // set table
    this.table = table;

    return this;
  }

  getDynamoInstance() {
    return this.client;
  }
  getAllRecords() {
    let body = this.client.scan({ TableName: this.table }).promise();
    return body;
  }
  getRecordById(id: string) {
    let record = this.client
      .get({
        TableName: this.table,
        Key: {
          id: id,
        },
      })
      .promise();
    return record;
  }
  createRecord(body: { [key: string]: any }) {
    const { name, address, phone } = body;
    const id = uuid();
    let promise = new Promise((resolve, reject) => {
      let params = {
        TableName: this.table,
        Item: {
          id: id,
          name: name,
          address: address,
          phone: phone,
        },
      };
      this.client.put(params, (err) => {
        if (err) reject(err);
        else resolve(params.Item);
      });
    });
    return promise;
  }
  deleteRecordById(id: string) {
    let promise = new Promise((resolve, reject) => {
      let params = {
        TableName: this.table,
        Key: {
          id: id,
        },
      };
      this.client.delete(params, (err) => {
        if (err) reject(err);
        else resolve(`Record deleted: ${params.Key.id}`);
      });
    });
    return promise;
  }
}
