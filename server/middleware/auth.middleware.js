const User = require("../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  const cookieUser = req.signedCookies.user_id;
  const user = await User.findById(cookieUser);
  if (!user) {
    res.redirect("/login");
  }
  res.locals.user = user;
  next();
};
