import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { User } from '../../../core';
import AbstractAWSDynamoDBRepository from './abstract-repository';

export default class UserRepository extends AbstractAWSDynamoDBRepository<User, string> {
  constructor(docClient: DocumentClient, tableName: string) {
    super(docClient, tableName);
  }

  async add(user: User): Promise<User> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: user,
      })
      .promise();

    return user;
  }
}
