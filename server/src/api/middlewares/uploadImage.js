const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// middleware to upload images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("../src/images"));
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;