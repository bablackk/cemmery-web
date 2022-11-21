const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const {
  JWT_TOKEN,
  JWT_EXPIRES_IN,
  JWT_EXPIRES_IN_COOKIE,
  NODE_ENV,
} = require("../config/index.config");

module.exports = authController = {
  //register
  registerUser: async (req, res) => {
    try {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // create new User
      const newUser = await new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashed,
      });
      const user = await newUser.save();
      res.status(200).json({
        data: {
          user,
        },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json("Wrong email or password");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("Wrong email or password");
      }
      if (user && validPassword) {
        const { password, ...others } = user._doc;
        return res.status(200).json({
          status: "success",
          user: { others },
        });
      }
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  },
};
