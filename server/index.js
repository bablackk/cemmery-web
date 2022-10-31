const path = require("path");
const express = require("express");
const Helmet = require("helmet");
const cors = require("cors");
const { mongoose } = require("mongoose");
const morgan = require("morgan");
const { PORT, URI_MONGODB } = require("./config/index.config");
const cookieParser = require("cookie-parser");
const BodyParser = require("body-parser");
const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/admin/product.route");
const userRoute = require("./routes/admin/user.route");
const app = express();

//middleware
app.use(Helmet());
app.use(morgan("dev"));
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//TEMPLATE ENGINE
app.set("view engine", "pug");
// static files
app.set("/public", path.join(__dirname, "public"));
app.set("views", path.join(__dirname, "./views"));

// connect to DB
mongoose.connect(URI_MONGODB, async () => {
  await console.log("DB connected");
});

app.get("/", (req, res) => {
  res.status(200).render("base");
});
// Route
app.use("/api/auth", authRoute);
app.use("/api/admin", productRoute);
app.use("/api/admin", userRoute);
// connect server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
