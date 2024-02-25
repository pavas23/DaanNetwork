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
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  gstnumber:{
    type: String,
    required: false,
  },
  regnumber:{
    type: String,
    required: true,
  }
});

const Ngo = mongoose.model("ngo", ngoSchema);
module.exports = Ngo;
