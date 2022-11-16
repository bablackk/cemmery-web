require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  URI_MONGODB: process.env.URI_DB,
  JWT_TOKEN: process.env.JWT_TOKEN,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_EXPIRES_IN_COOKIE: process.env.JWT_EXPRIRES_IN_COOKIE,
  NODE_ENV: process.env.NODE_ENV,
};
