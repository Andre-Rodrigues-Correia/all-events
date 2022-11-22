import {Schema, model} from 'mongoose';
import { localInterface } from '../interfaces/Interfaces';

const LocalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: Number,
      required: true,
    },
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Type'
      }
    ],
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      district: {
        type: String,
        required: true,
        trim: true,
      },
      number: {
        type: Number,
        required: true,
      },
      city: {
        type: Schema.Types.ObjectId,
        ref: 'City'
      },
      state: {
        type: Schema.Types.ObjectId,
        ref: 'State'
      },
      country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
      }
    },
  },
  { timestamps: true },
);
export default model<localInterface>('Local', LocalSchema);