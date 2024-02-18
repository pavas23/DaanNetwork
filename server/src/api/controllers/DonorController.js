const Donor = require("../models/donor");
const FoodDonation = require("../models/foodDonation");
const UploadImage = require("../models/uploadImage");
const router = require("../routes");
const path = require("path");

// donor controller to create donor
// req body : { name, emailId, contactNumber, address, password }
// res : {status:boolean,desc:string}
module.exports.createDonor = async (req, res) => {
  try {
    const { name, emailId, contactNumber, address, password } = req.body;

    // check if donor with this email already exists or not
    const donors = await Donor.find({ emailId: emailId });
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
// res : { status:boolean, desc:string }
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

// donor controller to see my all accepted donation requests
// req body { donorEmailId }
// res : { status:boolean, desc:string }
module.exports.getAllAcceptedDonationRequests = async (req, res) => {
  try {
    const { donorEmailId } = req.body;

    // finding donor by email id
    const donors = await Donor.find({ emailId: donorEmailId });
    if (donors.length == 0) {
      // no valid donor exists
      return res.status(400).json({
        status: false,
        desc: "No valid donor exists with this mail id !!",
      });
    }

    var foodDonations = await FoodDonation.find({ accepted: true })
      .populate("donor")
      .populate("ngo")
      .exec();
    foodDonations = (await foodDonations).map((donation) => {
      if (donation.donor.emailId == donorEmailId) return donation.toJSON();
    });

    // empty list
    if (foodDonations[0] == null) {
      return res
        .status(200)
        .json({ status: false, foodDonations: foodDonations });
    }
    return res.status(200).json({ status: true, foodDonations: foodDonations });
  } catch (error) {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }
  }
};

// donor controller to render image upload page
// req body : {}
// res : renders ejs page
module.exports.renderUploadImageTemplate = async (req, res) => {
  try {
    return res
      .status(200)
      .render(path.resolve("../src/api/views/uploadImage.ejs"));
  } catch (error) {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ status: false, desc: "Internal Server Error Occured" });
    }
  }
};

// donor controller to upload images for donation items
// req body : {}
// res : { status:boolean, desc:string }
module.exports.uploadDonationImages = async (req, res) => {
  try {
    let image = await UploadImage.create({
      imageName: Date.now() + path.extname(req.file.originalname),
    });
    console.log(image);
    return res.status(200).json({ status: true, desc: "Image uploaded !!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: false, desc: "Internal Server Error Occured" });
  }
};
