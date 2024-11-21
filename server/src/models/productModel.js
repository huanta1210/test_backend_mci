import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      minLength: 3
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    category: {
      type: String,
      enum: ['Apple', 'Orange'],
      default: 'Apple',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model('Product', productSchema);
