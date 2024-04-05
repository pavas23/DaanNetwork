const express = require("express");
const router = express.Router();
const uploadCertificate = require("../middlewares/uploadCertificate");
const ngoController = require("../controllers/NgoController");
const { ngoVerification } = require("../middlewares/ngoVerify");
/**
 * @swagger
 * components:
 *      schemas:
 *          Ngo:
 *           type: object
 *           required:
 *              - name
 *              - panNumber
 *              - nameOfHead
 *              - gender
 *              - emailId
 *              - password
 *              - contactNumber
 *              - website
 *              - address
 *           properties:
 *              name:
 *                  type: string
 *                  description: The name of ngo
 *              panNumber:
 *                  type: string
 *                  descripton: The pan number of ngo
 *              nameOfHead:
 *                  type: string
 *                  description: The name of head of ngo
 *              gender:
 *                  type: string
 *                  description: The gender of head of ngo
 *              emailId:
 *                  type: string
 *                  description: The official mail id of ngo
 *              password:
 *                  type: string
 *                  description: The password of ngo stored after encrypting using bcrypt js
 *              contactNumber:
 *                  type: Number
 *                  description: The contact number of ngo
 *              website:
 *                  type: string
 *                  description: The link to official website of ngo
 *              address:
 *                  type: string
 *                  description: The address where ngo is located
 *           example:
 *               name: "Gabvine"
 *               panNumber: "52-113-5428"
 *               nameOfHead: "Aarushi"
 *               gender: "Female"
 *               emailId: "amerkle0@disqus.com"
 *               password: "$2a$04$e6eKKqTu1GA1/Kni6drYz.aHFFqVUJLYul4d5aagugJvzfHEN7JVC"
 *               contactNumber: 7890380534
 *               website: "abc@gmail.com"
 *               address: "Suite 70"
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          NgoDonationRequest:
 *           type: object
 *           required:
 *              - createdAt
 *              - startDate
 *              - endDate
 *              - description
 *              - ngo
 *              - donors
 *           properties:
 *              createdAt:
 *                  type: date
 *                  description: Defaults to current date
 *              startDate:
 *                  type: date
 *                  descripton: start date of donation drive (Defaults to current date)
 *              endDate:
 *                  type: date
 *                  description: End date of donation drive
 *              description:
 *                  type: object
 *                  description: object
 *              ngo:
 *                  type: id
 *                  description: ngo details
 *              donors:
 *                  type: array
 *                  description: array of donors who signedup for drive.
 */

/**
 * @swagger
 * tags:
 *   name: NGO
 *   description: The APIs for NGO
 */

router.post("/ngo-login", ngoController.NGOLogin);

router.post(
  "/create-ngo",
  uploadCertificate.single("reg_certificate"),
  ngoController.addNGO
);
router.post("/ngo-login", ngoController.NGOLogin);
router.get(
  "/get-all-donation-requests",
  ngoVerification,
  ngoController.getAllDonationRequests
);
router.post(
  "/accept-donation-request",
  ngoVerification,
  ngoController.acceptDonationRequest
);
router.post("/get-my-donation-requests", ngoVerification, ngoController.getMyDonationRequests);
router.post(
  "/create-donation-request",
  ngoVerification,
  ngoController.createDonationRequest
);
router.post("/get-all-drives", ngoVerification, ngoController.getAllDonationDrives);
router.delete("/delete-donation-drive", ngoController.deleteDonationDrive);
router.get("/get-all-ngos", ngoController.getAllNgo)
router.post(
  "/my-profile",
  ngoVerification,
  ngoController.getMyProfile
);
router.post(
  "/delete-my-profile",
  ngoVerification,
  ngoController.deleteMyProfile
)
router.post("/get-address",ngoVerification,ngoController.getAddress)

module.exports = router;