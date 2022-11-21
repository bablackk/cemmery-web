const User = require("../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  const cookieUser = req.cookie.userId;
  if (!cookieUser) {
    res.redirect("/login");
    next();
  }
  const user = await User.findOne({ id: cookieUser });
  res.locals.user = user;
  next();
};
