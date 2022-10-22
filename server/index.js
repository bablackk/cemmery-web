const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const { PORT, URI_MONGODB } = require("./config/index.config");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());
app.use(express.json());

// connect to db
mongoose.connect(URI_MONGODB, async () => {
  await console.log("DB connected");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
