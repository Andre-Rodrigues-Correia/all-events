import {Schema, model} from 'mongoose';
import { cityInterface } from '../interfaces/Interfaces';

const CitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true,
    },
  },
  { timestamps: true },
);
export default model<cityInterface>('City', CitySchema);