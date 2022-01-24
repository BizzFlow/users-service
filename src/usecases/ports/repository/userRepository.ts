import { CRUDRepository } from '../infrastructure';
import { User } from '../../../core';

export default interface UserRepository extends CRUDRepository<User, string> {
}
