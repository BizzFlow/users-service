import { Model } from 'mongoose';
import { CreateUserDTO } from '../model/dto/createUserDTO';

export class UsersService {
  private users: Model<any>;
  constructor(users: Model<any>) {
    this.users = users;
  }

  /**
   * Create user
   * @param params
   */
  protected async createUser(params: CreateUserDTO): Promise<object> {
    try {
      const result = await this.users.create({
        name: params.name,
        id: params.id,
      });

      return result;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  /**
   * Update a user by id
   * @param id
   * @param data
   */
  protected updateUser(id: number, data: object) {
    return this.users.findOneAndUpdate(
      { id },
      { $set: data },
      { new: true },
    );
  }

  /**
   * Find users
   */
  protected findUsers() {
    return this.users.find();
  }

  /**
   * Query user by id
   * @param id
   */
  protected findOneUserById(id: number) {
    return this.users.findOne({ id });
  }

  /**
   * Delete user by id
   * @param id
   */
  protected deleteOneUserById(id: number) {
    return this.users.deleteOne({ id });
  }
}
