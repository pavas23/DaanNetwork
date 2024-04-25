const { adminVerification } = require("../middlewares/adminVerify");
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.post("/adminLogin",adminController.adminLogin);
router.post("/blockUser", adminVerification, adminController.blockUser);
router.post("/isBlocked", adminVerification, adminController.isBlocked);
router.post("/unblockUser", adminVerification, adminController.unblockUser);
router.get("/getDonorCount",adminVerification,adminController.getDonorCount);
router.get("/getNgoCount",adminVerification,adminController.getNgoCount);
router.get("/getDonationDriveCount",adminVerification,adminController.getDonationDriveCount);
router.get("/getAvgAcceptTime",adminVerification,adminController.getAvgAcceptTime);
router.get("/getAvgDonors",adminVerification,adminController.getAvgDonorsPerDrive);
module.exports = router;