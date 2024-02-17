const Donor = require("../models/donor");
const FoodDonation = require("../models/foodDonation");

// donor controller to create donor
// req body : { name, emailId, contactNumber, address, password }
// res : {status:boolean,desc:string}
module.exports.createDonor = async (req, res) => {
  try {
    const { name, emailId, contactNumber, address, password } = req.body;

    // check if donor with this email already exists or not
    const donors = await Donor.find({ emailId: donorEmailId });
    if (donors.length != 0) {
      return res.status(400).json({
        status: false,
        desc: "Donor already exists with this mail id",
      });
    }

    let donor = await Donor.create({
      name: name,
      emailId: emailId,
      contactNumber: contactNumber,
      address: address,
      password: password,
    });
    console.log(donor);
    res.status(200).json({ status: true, desc: "Donor created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

// donor controller to create food donation request
// req body : { quantity, numberDaysBeforeExpiry, description, pickUpLocation, donorEmailId }
// res : {status:boolean,desc:string}
module.exports.createDonationRequest = async (req, res) => {
  try {
    const {
      quantity,
      numberDaysBeforeExpiry,
      description,
      pickUpLocation,
      donorEmailId,
    } = req.body;

    // finding donor by email id
    const donors = await Donor.find({ emailId: donorEmailId });
    if (donors.length == 0) {
      // no valid donor exists
      return res.status(400).json({
        status: false,
        desc: "No valid donor exists with this mail id !!",
      });
    }

    // find number of requests made by this donor
    var count = (await FoodDonation.find({ donor: donors[0]._id })).length;

    // creating food donation request
    let foodDonation = await FoodDonation.create({
      donationRequestNum: count + 1,
      quantity: quantity,
      numberDaysBeforeExpiry: numberDaysBeforeExpiry,
      createdAt: new Date(),
      description: description,
      images: [],
      pickUpLocation: pickUpLocation,
      donor: donors[0]._id,
      accepted: false,
    });

    console.log(foodDonation);
    res.status(200).json({ status: true, desc: "Donation request created" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};
