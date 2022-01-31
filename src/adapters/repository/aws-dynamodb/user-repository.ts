import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { User } from '../../../core';
import AbstractAWSDynamoDBRepository from './abstract-repository';

export default class UserRepository extends AbstractAWSDynamoDBRepository<
  User,
  string
> {
  constructor(docClient: DocumentClient, tableName: string) {
    super(docClient, tableName);
  }
}
