const mongoose = require("mongoose");
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(()=>{
        console.log("connected to mongod successfully!!");
    }).catch((err)=>{
        console.error(err);
    });
};

module.exports = connectToMongo;