import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { CRUDRepository } from '../../../usecases/ports/infrastructure';

export default abstract class AbstractAWSDynamoDBRepository<T, K>
  implements CRUDRepository<T, K>
{
  constructor(
    protected readonly docClient: DocumentClient,
    protected readonly tableName: string
  ) {}

  async findAll(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  async findByKey(_key: K): Promise<T | undefined> {
    throw new Error('Method not implemented.');
  }

  async add(item: T): Promise<T> {
    console.log(`TABLE => ${this.tableName}`);
    console.log(`ITEM => ${JSON.stringify(item, null, 2)}`);

    await this.docClient
      .put({
        TableName: this.tableName,
        Item: item,
      })
      .promise();

    return item;
  }

  async update(_entity: T): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async exists(_key: K): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
