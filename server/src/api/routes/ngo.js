const express = require("express");
const router = express.Router();

const ngoController = require("../controllers/NgoController");

router.post("/create-ngo", ngoController.createNgo);
router.get("/get-all-donation-requests", ngoController.getAllDonationRequests);
router.post("/accept-donation-request", ngoController.acceptDonationRequest);
router.post("/get-my-donation-requests", ngoController.getMyDonationRequests);
router.post("/send-confirmation-mail",ngoController.sendConfirmationMailToDonor);

module.exports = router;
