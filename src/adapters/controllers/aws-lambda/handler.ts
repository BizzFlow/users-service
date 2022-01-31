import dotenv from 'dotenv';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import middleware from './middleware';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

import { APIGatewayEvent, Handler, Context, APIGatewayProxyResult } from 'aws-lambda';

import formatJSONResponse from './formatJSONResponse';
import AddUserUseCase from '../../../usecases/users/addUser';
import UserRepository from '../../repository/aws-dynamodb/user-repository';
import createDynamoDBClient from '../../repository/aws-dynamodb/dynamodb';
import { User } from '../../../core';

const userRepository = new UserRepository(createDynamoDBClient(), process.env.USERS_TABLE);

export const create: Handler = middleware(
  async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    const addUserUseCase = new AddUserUseCase(userRepository);
    const createUserEvent = event.body;
    const userResponse = await addUserUseCase.execute({
      user: mapEventToType(createUserEvent),
    });
    return formatJSONResponse(201, userResponse);
  }
);

const mapEventToType = (event: any): User => {
  return {
    userId: uuidv4(),
    name: event.name,
    description: event.description,
    active: true,
    createdAt: new Date().toISOString(),
  } as User;
};
