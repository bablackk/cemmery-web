const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      require: true,
      unique: true,
      minLength: 5,
    },
    price: {
      type: Number,
      require: true,
      minLength: 5,
    },
    thumbnail: {
      type: String,
    },
    thumbnailAfter: {
      type: String,
    },
    size: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
