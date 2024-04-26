const { adminVerification } = require("../middlewares/adminVerify");
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.post("/adminLogin", adminController.adminLogin);
router.post("/blockUser", adminVerification, adminController.blockUser);
router.post("/isBlocked", adminVerification, adminController.isBlocked);
router.post("/unblockUser", adminVerification, adminController.unblockUser);
router.get("/getDonorCount", adminVerification, adminController.getDonorCount);
router.get("/getNgoCount", adminVerification, adminController.getNgoCount);
router.get(
  "/getDonationDriveCount",
  adminVerification,
  adminController.getDonationDriveCount,
);
router.get(
  "/getAvgAcceptTime",
  adminVerification,
  adminController.getAvgAcceptTime,
);
router.get(
  "/getAvgDonors",
  adminVerification,
  adminController.getAvgDonorsPerDrive,
);
router.get(
  "/getVerifiedNGOCount",
  adminVerification,
  adminController.getCountOfVerifiedNGO,
);
router.get(
  "/getCompletedDrives",
  adminVerification,
  adminController.getNumberOfCompleteDrives,
);
router.get(
  "/getAcceptedDonations",
  adminVerification,
  adminController.getDonationStat,
);
router.get(
  "/getDonationReqTimeSeries",
  adminController.getDonationReqTimeSeries,
);
router.get("/getNgoStates", adminVerification, adminController.getNgoStates);
router.get(
  "/getDonorStates",
  adminVerification,
  adminController.getDonorStates,
);
router.get(
  "/getFoodDonationStates",
  adminVerification,
  adminController.getFoodDonationsStates,
);
router.get(
  "/getBlockedUsersStates",
  adminVerification,
  adminController.getBlockedUsersStates,
);
router.get(
  "/getVerifiedNgoStates",
  adminVerification,
  adminController.getVerifiedNgoStates,
);
router.post(
  "/addImpactStory",
  adminVerification,
  adminController.addImpactStory,
)
router.get(
  "/getImpactStory",
  adminController.getImpactStory,
)

module.exports = router;
