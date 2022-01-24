/* istanbul ignore file */

import mongoose, { Document } from 'mongoose'
import { CRUDRepository } from '../../usecases/ports/infrastructure';
import ModelMapper from './modelMapper';

export default abstract class AbstractMongoRepository<T, D extends Document<any>, K> implements CRUDRepository<T,K> {

	public abstract get documentToCoreModelMapper(): ModelMapper<T>;
	public abstract get repositoryDocumentModel(): mongoose.Model<D>;

	async findAll() : Promise<T[]> {
			const records = await this.repositoryDocumentModel.find();
			return records.map(record => this.documentToCoreModelMapper.mapToCoreModel(record));
	}

	async findByKey(_key: K) : Promise<T | undefined> {
		throw new Error("Method not implemented.");
	}

	async add(_entity: T) : Promise<void>{
		throw new Error("Method not implemented.");
	}

	async update(_entity: T) : Promise<void>{
		throw new Error("Method not implemented.");
	}

	async exists(_key: K) : Promise<boolean>{
		throw new Error("Method not implemented.");
	}
}
