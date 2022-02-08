/* istanbul ignore file */

export default interface CRUDRepository<T, K> {
  findAll: () => Promise<T[]>;
  findByKey: (key: K) => Promise<T | undefined>;
  add: (entity: T) => Promise<T>;
  update: (entity: T) => Promise<T>;
  exists: (key: K) => Promise<boolean>;
}
