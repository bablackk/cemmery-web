const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const { PORT, URI_MONGODB } = require("./config/index.config");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// connect to DB
mongoose.connect(URI_MONGODB, async () => {
  await console.log("DB connected");
});

// Route
app.use("/v1/auth", authRoute);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
