const { adminVerification } = require("../middlewares/adminVerify");
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.post("/adminLogin",adminController.adminLogin);
router.post("/blockUser", adminVerification, adminController.blockUser);
router.post("/isBlocked", adminVerification, adminController.isBlocked);
router.post("/unblockUser", adminVerification, adminController.unblockUser);

module.exports = router;