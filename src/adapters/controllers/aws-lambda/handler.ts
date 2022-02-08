import dotenv from 'dotenv';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { genSaltSync, hashSync } from 'bcryptjs';
import crypto from 'crypto';

import middleware from './middleware';

const dotenvPath = path.join(
  __dirname,
  '../',
  `config/.env.${process.env.NODE_ENV}`
);
dotenv.config({
  path: dotenvPath,
});

import {
  APIGatewayEvent,
  Handler,
  Context,
  APIGatewayProxyResult,
} from 'aws-lambda';

import formatJSONResponse from './formatJSONResponse';
import AddUserUseCase from '../../../usecases/users/addUser';
import UserRepository from '../../repository/aws-dynamodb/user-repository';
import createDynamoDBClient from '../../repository/aws-dynamodb/dynamodb';
import { User } from '../../../core';
import { CreateUserEvent } from '../models/create-user-event';

export const create: Handler = middleware(
  async (
    event: APIGatewayEvent,
    _context: Context
  ): Promise<APIGatewayProxyResult> => {
    const addUserUseCase = new AddUserUseCase(
      new UserRepository(createDynamoDBClient(), process.env.USERS_TABLE)
    );
    const createEvent: CreateUserEvent = event.body as CreateUserEvent;
    const userResponse = await addUserUseCase.execute({
      user: mapEventToType(createEvent),
    });
    return formatJSONResponse(201, userResponse);
  }
);

const mapEventToType = (event: CreateUserEvent): User => {
  const password = crypto.randomBytes(32).toString('hex');
  const salt = genSaltSync(10);
  const digest = hashSync(password, salt);

  return {
    userId: uuidv4(),
    profile: {
      firstName: event.firstName,
      lastName: event.lastName,
      description: event.description,
      email: event.email,
      password: password,
    },
    active: true,
    createdAt: new Date().toISOString(),
  } as User;
};
