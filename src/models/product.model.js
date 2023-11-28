import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: mongoose.Types.Decimal128,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("product", productSchema);
