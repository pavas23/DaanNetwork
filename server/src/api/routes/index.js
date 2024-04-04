const express = require("express");
const router = express.Router();

console.log("Router loaded");

router.use("/donor", require("./donor"));
router.use("/ngo", require("./ngo"));
router.use("/admin", require("./admin"));

module.exports = router;
