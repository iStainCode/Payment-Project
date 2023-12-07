import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    image1: {
      type: String
    },
    image2: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("product", productSchema);
