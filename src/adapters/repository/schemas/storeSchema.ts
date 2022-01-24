import mongoose, { Document, Schema } from 'mongoose';

const options = { collection: 'stores-geo' };

const storeSchema: Schema = new Schema({
	city: { type: String, required: true },
	postalCode: { type: String, required: true },
	street: { type: String, required: true },
	street2: { type: String, required: true },
	street3: { type: String, required: true },
	addressName: { type: String, required: true },
	uuid: { type: String, required: true },
	longitude: { type: String, required: true },
	latitude: { type: String, required: true },
	complexNumber: { type: String, required: true },
	showWarningMessage: { type: Boolean, required: true },
	todayOpen: { type: String, required: true },
	locationType: { type: String, required: true },
	collectionPoint: { type: Boolean, required: true },
	sapStoreID: { type: String, required: true },
	todayClose: { type: String, required: true }
}, options);

export interface StoreDocument extends Document {
	city: string;
	postalCode: string;
	street: string;
	street2: string;
	street3: string;
	addressName: string;
	uuid: string;
	longitude: number;
	latitude: number;
	complexNumber: string;
	showWarningMessage: boolean;
	todayOpen: string;
	locationType: string;
	collectionPoint: boolean;
	sapStoreID: string;
	todayClose: string;
}

export default mongoose.model<StoreDocument>('Store', storeSchema);