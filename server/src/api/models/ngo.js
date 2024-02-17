const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  panNumber: {
    type: String,
    required: true,
  },
  nameOfHead: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Ngo = mongoose.model("ngo", ngoSchema);
module.exports = Ngo;
