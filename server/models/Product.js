const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    image: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['pepper', 'cardamom', 'other'],
      default: 'other',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    unit: {
      type: String,
      default: '100g',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
