const bcrypt = require("bcrypt");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const {
  JWT_TOKEN,
  JWT_EXPIRES_IN,
  JWT_EXPIRES_IN_COOKIE,
  NODE_ENV,
} = require("../config/index.config");

const signToken = (id) =>
  jwt.sign({ id }, JWT_TOKEN, {
    expiresIn: JWT_EXPIRES_IN,
  });

const cookieOption = {
  expires: new Date(Date.now() + JWT_EXPIRES_IN_COOKIE * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

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
      const token = signToken(newUser._id);
      // set cookie register

      res.cookie("jwt", token, cookieOption);
      if (NODE_ENV === "production") cookieOption.scure = true;
      // save to database
      const user = await newUser.save();
      res.status(200).json({
        token,
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
      const email = await User.findOne({ email: req.body.email });
      const token = signToken(email._id);
      res.cookie("jwt", token, cookieOption);

      if (!email) {
        return res.status(404).json("Wrong email or password");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        email.password
      );
      if (!validPassword) {
        return res.status(404).json("Wrong email or password");
      }
      if (email && validPassword) {
        const { _id, password, ...others } = email._doc;
        return res.status(200).json({
          status: "success",
          token,
          user: { others },
        });
      }
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  },
  protect: async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      next();
    }
    if (!token) {
      return next(res.status(401).json("please log in to get access"));
    }
    //verify token
    const decoded = await promisify(jwt.verify)(token, JWT_TOKEN);
    console.log(decoded);
  },
};
