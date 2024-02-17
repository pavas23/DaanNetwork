const express = require("express");
const router = express.Router();

console.log("Router loaded");

router.use('/donor',require("./donor"));

module.exports = router;