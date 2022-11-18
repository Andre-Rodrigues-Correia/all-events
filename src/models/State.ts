import mongoose from 'mongoose';

const { Schema } = mongoose;
const StateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    sigla: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'Country'
    },
  },
  { timestamps: true },
);
export default mongoose.model('State', StateSchema);