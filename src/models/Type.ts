import {Schema, model} from 'mongoose';
import { typeInterface } from '../interfaces/Interfaces';

const TypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);
export default model<typeInterface>('Type', TypeSchema);