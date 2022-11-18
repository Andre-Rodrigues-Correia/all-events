import mongoose from 'mongoose';

const { Schema } = mongoose;
const CitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State'
    },
  },
  { timestamps: true },
);
export default mongoose.model('City', CitySchema);