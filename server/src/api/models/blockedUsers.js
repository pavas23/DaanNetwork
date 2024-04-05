const mongoose = require("mongoose");

const blockedUsersSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
  },
});

const blockedUsers = mongoose.model("Blocked Users", blockedUsersSchema);
module.exports = blockedUsers;
