const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = (process.env.NODE_ENV == "production") ? process.env.MONGO_URI_PROD :process.env.MONGO_URI_DEV

const connectToMongo = () => {
  mongoose
    .connect((mongoURI))
    .then(() => {
      console.log("connected to mongod successfully!!");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectToMongo;







