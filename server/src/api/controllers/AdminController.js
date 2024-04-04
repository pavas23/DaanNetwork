const BlockedUsers = require("../models/blockedUsers");

module.exports.blockUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await BlockedUsers.findOne({ emailId:userId });
        if (user) {
            return res.status(400).json({ status: false, desc: "User already blocked" });
            }
        const blockedUser = new BlockedUsers({
            emailId: userId,
        });
        await blockedUser.save();
        return res.status(200).json({ status: true, desc: "User Blocked Successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }
  };