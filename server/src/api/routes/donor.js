const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadImage");

const donorController = require("../controllers/DonorController");

router.post("/create-donor", donorController.createDonor);
router.post("/donation-request", donorController.createDonationRequest);
router.post("/my-accepted-donation-requests",donorController.getAllAcceptedDonationRequests);
router.get("/render-upload-page",donorController.renderUploadImageTemplate);
router.post("/upload-images",upload.single('image'),donorController.uploadDonationImages);

module.exports = router;
