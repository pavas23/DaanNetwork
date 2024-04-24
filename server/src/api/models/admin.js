const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const admin = mongoose.model("admin", adminSchema);
module.exports = admin;
