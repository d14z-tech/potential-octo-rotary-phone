import mongoose from "mongoose";

export default mongoose.model('Product', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0,
    required: true,
    min: 0
  },
  units: {
    type: Number,
    default: 0,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}));