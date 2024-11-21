import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      minLength: 6,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'customer'
    }
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model('Customer', customerSchema);
