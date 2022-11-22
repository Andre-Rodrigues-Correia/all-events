import mongoose from 'mongoose';

const { Schema } = mongoose;
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
export default mongoose.model('Event', EventSchema);