const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json());
const cors = require("cors");
const port = process.env.PORT || 8000;
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line to parse URL-encoded data
const routes = require("./routes/index.js");
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/api/", routes);
