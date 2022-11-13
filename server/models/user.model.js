const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
      minLength: 1,
    },
    lastname: {
      type: String,
      require: true,
      minLength: 1,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      require: true,
      minLength: 6,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
