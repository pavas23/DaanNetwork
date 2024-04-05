const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.adminVerification = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(400)
      .json({ status: false, desc: "Please authenticate using a valid token" });
  }
  try {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(400).json({
          status: false,
          desc: "Please authenticate using a valid token",
        });
      } else {
        const user = await Admin.findById(data.id);
        if (user) {
          req.user = user;
          next();
        } else {
          return res
            .status(500)
            .json({ status: false, desc: "Internal Server Error Occured !" });
        }
      }
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, desc: "Internal Server Error Occured !" });
  }
};