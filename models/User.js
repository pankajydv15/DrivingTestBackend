const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  licenseNumber: String,
  dob: String,
  location: String,
  expiryDate: String,
  issuedDate: String,
  mobileNumber: String,
  ttNumber: String,
  photo: String,
  dlFrontPhoto: String,
  dlBackPhoto: String,
  scores: {
    preTestScore: Number,
    postTestScore: Number,
    colorBlindTestScore: Number,
    roadTestScore: Number,
  },
});

module.exports = mongoose.model('User', userSchema);
