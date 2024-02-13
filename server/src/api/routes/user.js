const express = require("express");
const router = express.Router();

const userController = require('../controllers/UserController');

router.post('/food-request', userController.createFoodRequest);

module.exports = router;