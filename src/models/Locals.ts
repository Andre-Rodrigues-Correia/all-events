import mongoose from 'mongoose';

const { Schema } = mongoose;
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
    adress: {
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
      }
    },
  },
  { timestamps: true },
);
export default mongoose.model('Local', LocalSchema);