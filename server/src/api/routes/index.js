const express = require("express");
const router = express.Router();

console.log("Router loaded");

router.use('/user',require("./user"));

module.exports = router;