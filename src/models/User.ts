import { model, Schema, Document } from 'mongoose';

interface IUserSchema extends Document {
  id?: string;
  email: string;
  password: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model<IUserSchema>('User', UserSchema);