import mongoose from 'mongoose';

const { Schema } = mongoose;
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
export default mongoose.model('Country', CountrySchema);