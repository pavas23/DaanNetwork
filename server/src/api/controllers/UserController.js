const User = require("../models/user");
const Food = require("../models/food");

module.exports.createFoodRequest = (req,res) => {
    const foodData = req.body;
    console.log(foodData);
    res.send("data received");
};

