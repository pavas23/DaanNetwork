const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.post("/blockUser", adminController.blockUser);
router.post("/isBlocked", adminController.isBlocked);
router.post("/unblockUser", adminController.unblockUser);

module.exports = router;
