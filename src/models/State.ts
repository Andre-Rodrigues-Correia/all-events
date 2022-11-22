import {Schema, model} from 'mongoose';
import { stateInterface } from '../interfaces/Interfaces';

const StateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    initials: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Country'
    },
  },
  { timestamps: true },
);
export default model<stateInterface>('State', StateSchema);