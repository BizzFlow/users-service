import mongoose from 'mongoose';

export type UsersDocument = mongoose.Document & {
  name: string,
  id: number,
  description: string,
  createdAt: Date,
};

const usersSchema = new mongoose.Schema({
  name: String,
  id: { type: Number, index: true, unique: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

// Note: OverwriteModelError: Cannot overwrite `Users` model once compiled. error
export const users = (mongoose.models.users ||
  mongoose.model<UsersDocument>('users', usersSchema, process.env.DB_BOOKS_COLLECTION)
);