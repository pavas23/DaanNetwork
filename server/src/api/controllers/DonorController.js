const Donor = require("../models/donor");
const FoodDonation = require("../models/foodDonation");

// donor controller to create food donation request
module.exports.createDonationRequest = async (req,res) => {
    try{
        const {quantity, numberDaysBeforeExpiry, description, imageArray, pickUpLocation} = req.body;
        let food = await FoodDonation.create({
            quantity : quantity,
            numberDaysBeforeExpiry : numberDaysBeforeExpiry,
            createdAt: new Date(),
            description : description,
            images: imageArray,
            pickUpLocation: pickUpLocation,
        });
        console.log(food);
        res.status(200).send("Donation request created");
    }catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error Occured");
    }
};

