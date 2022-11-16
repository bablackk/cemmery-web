const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const { mongoose } = require("mongoose");
const morgan = require("morgan");
const { PORT, URI_MONGODB, NODE_ENV } = require("./config/index.config");
const cookieParser = require("cookie-parser");
const BodyParser = require("body-parser");
const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/admin/product.route");
const userRoute = require("./routes/admin/user.route");
const viewRoute = require("./routes/view/view.route");
const app = express();

//middleware
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(
  "/api",
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP please try again in an hour!!",
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
// connect server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
