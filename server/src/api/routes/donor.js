const express = require("express");
const router = express.Router();

const donorController = require("../controllers/DonorController");

router.post("/create-donor", donorController.createDonor);
router.post("/donation-request", donorController.createDonationRequest);

module.exports = router;
