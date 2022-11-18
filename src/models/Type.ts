import mongoose from 'mongoose';

const { Schema } = mongoose;
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
export default mongoose.model('Type', TypeSchema);