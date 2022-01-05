
import { Handler, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

import { users } from './model';
import { UsersController } from './controller/users';
const usersController = new UsersController(users);

export const create: Handler = (event: any, context: Context) => {
  return usersController.create(event, context);
};

export const update: Handler = (event: any) => usersController.update(event);

export const find: Handler = () => usersController.find();

export const findOne: Handler = (event: any, context: Context) => {
  return usersController.findOne(event, context);
};

export const deleteOne: Handler = (event: any) => usersController.deleteOne(event);
