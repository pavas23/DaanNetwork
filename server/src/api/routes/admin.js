const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.post("/blockUser", adminController.blockUser);

module.exports = router;