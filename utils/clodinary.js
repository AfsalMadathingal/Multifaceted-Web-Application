const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'dvenrjxhh',
  api_key: 'YOUR_KEY',
  api_secret: 'YOUR_KEY',
  secure: true,
});


module.exports = cloudinary;