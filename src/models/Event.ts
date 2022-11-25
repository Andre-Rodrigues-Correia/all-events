import {Schema, model} from 'mongoose';
import { eventInterface } from '../interfaces/Interfaces';

const EventSchema = new Schema(
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
    organizer: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: Number,
      required: true,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category'
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
        ref: 'City',
        required: true,
      },
      state: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true,
      },
      country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true,
      }
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);
export default model<eventInterface>('Event', EventSchema);