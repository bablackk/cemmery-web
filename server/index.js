const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session")(session);
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const {
  PORT,
  URI_MONGODB,
  NODE_ENV,
  SECRET_KEY,
} = require("./config/index.config");
const cookieParser = require("cookie-parser");
const BodyParser = require("body-parser");
const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/admin/product.route");
const userRoute = require("./routes/admin/user.route");
const viewRoute = require("./routes/view/view.route");
const app = express();
//save session to database
const store = new mongoDBSession({
  uri: URI_MONGODB,
  collection: "sessions",
});

//middleware
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(cors());
app.use(cookieParser(SECRET_KEY));
app.use(express.json());
app.use(
  "/api",
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP please try again in an hour!!",
  })
);
//config session in database
app.use(
  session({
    name: "session_id",
    secret: "dpql-key-session",
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // save session 1 day
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(async (req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});
//TEMPLATE ENGINE
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
// static files

app.use(express.static(path.join(__dirname, "public")));
// connect to DB
mongoose.connect(URI_MONGODB, async () => {
  await console.log("DB connected");
});

// Route
app.use("/", viewRoute);
app.use("/api/auth", authRoute);
app.use("/api/admin", productRoute);
app.use("/api/admin", userRoute);
// handle error 404 page
app.all("*", (req, res) => {
  res.status(404).render("error", {
    title: "Error",
  });
});
// connect server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
