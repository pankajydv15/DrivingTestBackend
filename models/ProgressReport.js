const mongoose = require('mongoose');

const progressReportSchema = new mongoose.Schema({
  scores: {
    preTestScore: Number,
    postTestScore: Number,
    colorBlindTestScore: Number,
    roadTestScore: Number,
  },
  userDetails: {
    name: String,
    licenseNumber: String,
    dob: String,
    location: String,
    expiryDate: String,
    issuedDate: String,
    mobileNumber: String,
    ttNumber: String,
    photo: String,  // User Photo URL
    dlFrontPhoto: String,  // Driver's License Front Photo URL
    dlBackPhoto: String,  // Driver's License Back Photo URL
  },
  totalScore: Number,
  result: String,
});

const ProgressReport = mongoose.model('ProgressReport', progressReportSchema);

module.exports = ProgressReport;
