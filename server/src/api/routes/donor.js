const express = require("express");
const router = express.Router();

const donorController = require("../controllers/DonorController");

router.post("/create-donor", donorController.createDonor);
router.post("/donation-request", donorController.createDonationRequest);
router.post("/my-accepted-donation-requests",donorController.getAllAcceptedDonationRequests);

module.exports = router;
