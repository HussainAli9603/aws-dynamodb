import { DynameDb } from '../dynamo.class';

describe('Test dynamodb class', () => {
  let obj = new DynameDb(true, 'table');
  it('Created Obj tobe instance of DynamoDb', () => {
    expect(obj instanceof DynameDb).toBe(true);
  });
  it('Obj instance should have getter method to get dynamodocument instance', () => {
    expect(typeof obj.getDynamoInstance()).toBe('object');
  });
  it('DynamoDb class should have function createRecord', () => {
    expect(typeof obj.createRecord).toBe('function');
  });
  it('DynamoDb class should have function deleteRecordById', () => {
    expect(typeof obj.deleteRecordById).toBe('function');
  });
  it('DynamoDb class should have function getAllRecords', () => {
    expect(typeof obj.getAllRecords).toBe('function');
  });
  it('DynamoDb class should have table variable of type string', () => {
    expect(typeof obj.table).toBe('string');
  });
});
