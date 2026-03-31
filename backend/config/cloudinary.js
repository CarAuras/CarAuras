require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cloudinary.config({
//   cloud_name: "personalprojectaswins",
//   api_key: "343244986796635",
//   api_secret: "sEVNeeKFS57c0udTcVgbNdY8nuk",
// });

module.exports = { cloudinary };
