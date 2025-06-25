import mongoose from "mongoose";
import { type } from "os";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover_images: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      enum: ["Silver", "Gold"],
      required: true,
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    karat: {
      type: Number,
      enum: [18, 21, 24],
      required: function () {
        return this.type === "Gold";
      },
    },
    size: {
      type: Number,
      size: {
        type: Number,
        required: true
      }
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
