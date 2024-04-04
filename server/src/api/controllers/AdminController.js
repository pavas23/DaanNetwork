const BlockedUsers = require("../models/blockedUsers");

module.exports.blockUser = async (req, res) => {
    try {
        const { emailId } = req.body;
        const user = await BlockedUsers.findOne({ emailId:emailId });
        if (user) {
            return res.status(400).json({ status: false, desc: "User already blocked" });
            }
        const blockedUser = await BlockedUsers.create({
            emailId: emailId,
        });
        return res.status(201).json({ status: true, desc: "User Blocked Successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }
  };