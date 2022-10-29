const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const morgan = require("morgan");
const { PORT, URI_MONGODB } = require("./config/index.config");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/admin/product.route");
const userRoute = require("./routes/admin/user.route");
const app = express();

//middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// connect to DB
mongoose.connect(URI_MONGODB, async () => {
  await console.log("DB connected");
});

// Route
app.use("/api/auth", authRoute);
app.use("/api/admin", productRoute);
app.use("/api/admin", userRoute);
// connect server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
