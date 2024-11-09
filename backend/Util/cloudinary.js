const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CloudName,
  api_key: process.env.CloudAPIKey,
  api_secret: process.env.CloudAPISecret,
});

module.exports = { cloudinary };
