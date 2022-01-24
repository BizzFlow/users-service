import mongoose from 'mongoose';
import { GeoLocation } from 'src/core';

import Store from '../../core/store';
import StoreRepository from '../../usecases/ports/repository/storeRepository';
import MappingException from '../controllers/exceptions/mappingException';
import AbstractMongoRepository from './abstractMongoRepository';
import ModelMapper from './modelMapper';
import storeModel, { StoreDocument } from './schemas/storeSchema';

export class StoreModelMapper implements ModelMapper<Store> {
	mapToCoreModel(element: any): Store {
		try {
			const result = {
				city: element.city,
				postalCode: element.postalCode,
				street: element.street,
				street2: element.street2,
				street3: element.street3,
				addressName: element.addressName,
				uuid: element.uuid,
				longitude: Number(element.longitude),
				latitude: Number(element.latitude),
				complexNumber: element.complexNumber,
				showWarningMessage: element.showWarningMessage,
				todayOpen: element.todayOpen,
				locationType: element.locationType,
				collectionPoint: element.collectionPoint,
				sapStoreID: element.sapStoreID,
				todayClose: element.todayClose
			} as Store;

			if ((result && isNaN(result.latitude)) || (result.longitude && isNaN(result.longitude))) {
				throw new MappingException(`Error mapping object ${JSON.stringify(element, null, 2)}`);
			}
			return result;
		} catch (error) {
			throw new MappingException(`Error mapping object ${JSON.stringify(element, null, 2)}`, error);
		}
	}
}

export default class StoreMongoRepository extends AbstractMongoRepository<Store, StoreDocument, string> implements StoreRepository {
	public get documentToCoreModelMapper(): ModelMapper<Store> {
		return new StoreModelMapper();
	}

	public get repositoryDocumentModel(): mongoose.Model<StoreDocument> {
		return storeModel;
	}

	async findNearest(geoLocation: GeoLocation, limit: number): Promise<Store[]> {
		const filter = {
			coordinates: {
				$near: [geoLocation.longitude, geoLocation.latitude]	
			}
		}
		const records = 
			await this.repositoryDocumentModel.find(filter).limit(Number(limit) || 5);

		return records.map(record => this.documentToCoreModelMapper.mapToCoreModel(record));
	}
}
