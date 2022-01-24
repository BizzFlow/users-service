import dotenv from 'dotenv';
import path from 'path';

import middleware from './middleware';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

import {
  APIGatewayEvent,
  Handler,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";

import formatJSONResponse from './formatJSONResponse';
import AddUserUseCase from '../../../usecases/users/addUser';

export const create: Handler = middleware(
  async (event: APIGatewayEvent, context: Context)
    : Promise<APIGatewayProxyResult> => {
    const addUserUseCase = new AddUserUseCase(null);
    const createUserEvent = event.body;
    const userResponse = await addUserUseCase.execute({
      user: createUserEvent
    });
    return formatJSONResponse(201, userResponse);
  });
