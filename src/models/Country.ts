import {Schema, model} from 'mongoose';
import { countryInterface } from '../interfaces/Interfaces';

const CountrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    coin: {
        type: String,
        required: false,
    },
  },
  { timestamps: true },
);
export default model<countryInterface>('Country', CountrySchema);