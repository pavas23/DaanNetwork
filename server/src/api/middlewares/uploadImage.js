const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// middleware to upload images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("../../client/my-app/src/images"));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getMinutes() + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
