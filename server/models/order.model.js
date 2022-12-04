const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
      maxLength: 20,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
      minLength: 10,
      maxLength: 11,
    },
    address: {
      type: String,
      require: true,
      maxLength: 50,
    },
    productOrder: {
      type: String,
    },
    size: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    totalMoney: {
      type: Number,
    },
    status: {
      type: String,
      default: "Chưa xác nhận",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
