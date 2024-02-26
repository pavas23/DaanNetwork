const express = require("express");
const router = express.Router();
const uploadImage = require("../middlewares/uploadImage");
const uploadFile = require("../middlewares/uploadFile");
const donorController = require("../controllers/DonorController");

/**
 * @swagger
 * components:
 *   schemas:
 *     FoodDonation:
 *       type: object
 *       required:
 *         - donationRequestNum
 *         - quantity
 *         - numberDaysBeforeExpiry
 *         - createdAt
 *         - description
 *         - pickUpLocation
 *         - accepted
 *       properties:
 *         donationRequestNum:
 *           type: Number
 *           description: For every donor this number is unique to keep track of donations made by a donor
 *         quantity:
 *           type: string
 *           description: Donor can describe the quantity of food being donated
 *         numberDaysBeforeExpiry:
 *           type: Number
 *           description: The number of days it will take food to get expired
 *         createdAt:
 *           type: Date
 *           description: To keep track of date, when donation request was created
 *         description:
 *           type: string,
 *           description: To tell if food is perishable or not etc.
 *         images:
 *           type: Array
 *           description: To store array of images of food being donated
 *         pickUpLocation:
 *           type: string,
 *           description: To specify the location from where ngo can collect food
 *         donor:
 *           type: mongoose.Schema.Types.ObjectId
 *           description: It refers to schema of donor, who created the donation request
 *         accepted:
 *           type: boolean
 *           description: It refers to schema of ngo (if any) which accepted the donation request
 *       example:
 *          quantity: "600 kgs"
 *          numberDaysBeforeExpiry: 2
 *          description: "perishable food item"
 *          pickUpLocation: "karol bagh"
 *          donorEmailId: "pavasgarg2003@gmail.com"
 *     Donor:
 *       type: object
 *       required:
 *         - name
 *         - emailId
 *         - password
 *         - contactNumber
 *         - address
 *       properties:
 *         name:
 *           type: string
 *           description: The name of donor
 *         emailId:
 *           type: string
 *           description: The email id of donor
 *         password:
 *           type: string
 *           description: The password of donor stored after encrypting using bcrypt js
 *         contactNumber:
 *           type: Number
 *           description: The contact number of donor
 *         address:
 *           type: string,
 *           description: The address field of user
 *       example:
 *         name: "Rohit Sharma"
 *         emailId: "rohit@gmail.com"
 *         password: "$2a$04$e6eKKqTu1GA1/Kni6drYz.aHFFqVUJLYul4d5aagugJvzfHEN7JVC"
 *         contactNumber: 1234567890
 *         address: "1st floor, abc nagar, hyd"
 */

/**
 * @swagger
 * tags:
 *   name: Donor
 *   description: The APIs for donor
 */

/**
 * @swagger
 * /donor/create-donor:
 *   post:
 *     summary: Adds a donor to the database
 *     tags: [Donor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Donor'
 *     responses:
 *       200:
 *         description: Donor was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Donor'
 */
router.post("/create-donor", donorController.createDonor);

/**
 * @swagger
 * /donor/donation-request:
 *   post:
 *     summary: Allows donor to make a donation request
 *     tags: [Donor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodDonation'
 *     responses:
 *       200:
 *         description: Donation request created
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/FoodDonation'
 */
router.post("/donation-request", donorController.createDonationRequest);

/**
 * @swagger
 * /donor/delete-donation-request:
 *  delete:
 *     summary: Allows donor to delete donation requests which are not accepted by ngo yet
 *     tags: [Donor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodDonation'
 *     responses:
 *       200:
 *         description: Donation request deleted
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/FoodDonation'
 */
router.delete("/delete-donation-request",donorController.deleteDonationRequest);

/**
 * @swagger
 * /donor/my-accepted-donation-requests:
 *   post:
 *     summary: Donor can see his/her all requests which have been accepted by some ngo
 *     tags: [Donor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *                 donorEmailId: "rohit@gmail.com"
 *     responses:
 *       200:
 *         description: Will get list of all accepted donation requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.post("/my-accepted-donation-requests",donorController.getAllAcceptedDonationRequests);

/**
 * @swagger
 * /donor/render-upload-page:
 *   get:
 *     summary: This will render page for uploading images
 *     tags: [Donor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.get("/render-upload-page", donorController.renderUploadImageTemplate);

/**
 * @swagger
 * /donor/get-donation-history:
 *   post:
 *     summary: Donor can see all donations requests raised by them
 *     tags: [Donor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *                 donorEmailId: "rohit@gmail.com"
 *     responses:
 *       200:
 *         description: Will get list of all donation requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.post("/get-donation-history", donorController.getAllDonations);

/**
 * @swagger
 * /donor/appy-drive:
 *   post:
 *     summary: Donor can see all donations requests raised by them
 *     tags: [Donor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *                 donorEmailId: "rohit@gmail.com"
 *                 donationRequestId: "65d39e352afc2a8626d64180"
 *                 donationDetails:
 *                    items:
 *                      name: "Curry Powder"
 *                      quantity: 100
 *                    pickUpDate: "2024-02-28T18:07:59.741Z"
 *                    pickUpAddress: "BITS GOA"
 *                    description: "Timepass"
 *     responses:
 *       200:
 *         description: Will get list of all donation requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/NgoDonationRequest'
 */
router.post("/apply-for-donation-drive", donorController.applyForDonationDrive);

/**
 * @swagger
 * /donor/upload-images:
 *   post:
 *     summary: This will allow donor to upload images, this endpoint uses multer middleware
 *     tags: [Donor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.post("/upload-images",uploadImage.single("image"),donorController.uploadDonationImages);

/**
 *
 *
 */
router.get("/all-donation-drives", donorController.getAllDrives);

/**
 * @swagger
 * /donor/my-donation-drives:
 *   post:
 *     summary: Donor can see all drives they have applied for
 *     tags: [Donor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *                 donorEmailId: "rohit@gmail.com"
 *     responses:
 *       200:
 *         description: Will get list of all donation drives they have applied to
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.post("/my-donation-drives", donorController.getAllAppliedDrives);

/**
 * @swagger
 * /donor/delete-drive-application:
 *   post:
 *     summary: Donor can see all drives they have applied for
 *     tags: [Donor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *                 donorEmailId: "rohit@gmail.com"
 *                 donationDriveId: "65d39e352afc2a8626d64180"
 *     responses:
 *       200:
 *         description: Will get list of all donation drives they have applied to
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.post("/delete-drive-application",donorController.deleteApplicationToDrive);
