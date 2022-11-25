import {Schema, model} from 'mongoose';
import { categoryInterface } from '../interfaces/Interfaces';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);
export default model<categoryInterface>('Category', CategorySchema);