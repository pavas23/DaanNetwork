const express = require("express");
const path = require("path");
const multer = require("multer");

const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("../../client/my-app/public/registration-certificates"));
  },
  filename: (req, file, cb) => {
    cb(null, req.body.regnumber + path.extname(file.originalname));
  },
});

const uploadCertificate = multer({ storage: store });

module.exports = uploadCertificate;