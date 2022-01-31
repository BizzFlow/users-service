import { ErrorSeverity, UseCaseRequest } from '../ports/infrastructure';
import { User } from '../../core';
import { UseCase } from '../ports/infrastructure';
import UserRepository from '../ports/repository/userRepository';
import { UseCaseError } from '../ports/infrastructure/errors/useCaseError';

export default class AddUserUseCase implements UseCase {
  constructor(private repository: UserRepository) {}

  async execute(input: UseCaseRequest): Promise<User> {
    try {
      const user: User = input.user;
      return await this.repository.add(user);
    } catch (error) {
      throw new UseCaseError(
        {
          code: '1' /**  BUSINESS ERROR CODE, MAPPED SOMEWHERE, LIKE CONFLUENCE... */,
          message: 'An error ocurred while adding a user',
          source: 'AddUserUseCase.execute',
          severity: ErrorSeverity.ERROR,
          error,
        },
        error
      );
    }
  }
}
