const Donor = require("../models/donor");
const FoodDonation = require("../models/foodDonation");
const UploadImage = require("../models/uploadImage");
const NgoDonationRequest = require("../models/ngoDonationRequest");
const router = require("../routes");
const path = require("path");

/** donor controller to create donor
 * req body : { name, emailId, contactNumber, address, password }
 * res : {status:boolean,desc:string}
 */
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

/** donor controller to create food donation request
 * req body : { quantity, numberDaysBeforeExpiry, description, pickUpLocation, donorEmailId }
 * res : { status:boolean, desc:string }
 */
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

/** donor controller to see my all accepted donation requests
 * req body { donorEmailId }
 * res : { status:boolean, desc:string }
 */
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

/** donor controller to render image upload page
 * req body : {}
 * res : renders ejs page
 */
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
        .json({ status: false, desc: "Internal Server Error Occured" });
    }
  }
};

/** donor controller to upload images for donation items
 * req body : {}
 * res : { status:boolean, desc:string }
 */
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
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

/** donor controller to see my all donation requests
 * req body { donorEmailId }
 * res : { status:boolean, desc:string | foodDonations: List }
 */
module.exports.getAllDonations = async (req, res) => {
  const { donorEmailId } = req.body;

  try {
    const donors = await Donor.find({ emailId: donorEmailId });
    // no donor with given email
    if (donors.length == 0) {
      return res
        .status(400)
        .json({ status: false, desc: `No donor with email ${donorEmailId}` });
    }

    var foodDonations = await FoodDonation.find({})
      .populate("donor")
      .populate("ngo")
      .exec();

    foodDonations = (await foodDonations).map((donation) => {
      if (donation.donor.emailId == donorEmailId) return donation.toJSON();
    });

    if (foodDonations[0] == null) {
      return res
        .status(200)
        .json({ status: false, foodDonations: foodDonations });
    }
    return res.status(200).json({ status: true, foodDonations: foodDonations });
  } catch (err) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

/** donor controller to apply for donation drive created by ngo
 * req : {donorEmailId , donationDetails, donationRequestId (i think this will be enough as we dont need  * ngo id we can extract ngo id from the donation request)}
 *   donationDetails: {
 *      items: Array,
 *      pickUpDate: Date,
 *      pickUpAddress:String,
 *      description: String
 *   }
 */
module.exports.applyForDonationDrive = async (req, res) => {
  const { donorEmailId, donationDetails, donationRequestId } = req.body;
  console.log(donationDetails);
  try {
    var donor = await Donor.find({ emailId: donorEmailId });
    if (donor.length == 0)
      return res
        .status(400)
        .json({ status: true, msg: "No donor with this email" });

    var donationRequest = await NgoDonationRequest.findById(donationRequestId);
    if (donationRequest == null)
      return res.status(400).json({ status: true, msg: "Invalid donationID" });
    var ngo = donationRequest.ngo;

    const donor_obj = {
      donor: donor[0]._id,
      donation_items: donationDetails.items,
      pickUpDate: donationDetails.pickUpDate,
      pickUpAddress: donationDetails.pickUpAddress,
      description: donationDetails.description,
    };
    console.log(donor_obj);
    donationRequest.donors = [...donationRequest.donors, donor_obj];
    //idk why this is like this :(
    donationRequest.donors[donationRequest.donors.length - 1].donation_ītems =
      donor_obj.donation_items;
    console.log(donationRequest);
    var upDatedReq = await donationRequest.save();
    console.log(upDatedReq);
    res.status(200).json({ status: true, msg: upDatedReq });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

/** donor controller to get all ngo donation drives
 * view all donation drives
 * returns whole thing but pls remove ngo password and donors fields later
 */
module.exports.getAllDrives = async (req, res) => {
  try {
    var donation_drives = await NgoDonationRequest.find({})
      .populate("ngo")
      .exec();
    if (donation_drives.length == 0)
      return res.status(200).json({ status: true, drives: [] });
    console.log(donation_drives);
    res.status(200).json({ status: true, drives: donation_drives });
  } catch (err) {
    return res.send(500).json({ status: false, msg: "Internal Server Error" });
  }
};

/** donor controller to delete donation request
 * req body : { donorEmailId, donationRequestNum }
 * res: res : { status:boolean, desc:string }
 */
module.exports.deleteDonationRequest = async (req, res) => {
  try {
    const { donorEmailId, donationRequestNum } = req.body;

    // finding donor by email id
    const donors = await Donor.find({ emailId: donorEmailId });
    if (donors.length == 0) {
      // no valid donor exists
      return res.status(400).json({
        status: false,
        desc: "No valid donor exists with this mail id !!",
      });
    }

    // checking if this donation request exists or not
    var foodDonations = await FoodDonation.find({})
      .populate("donor")
      .populate("ngo")
      .exec();

    // filtering all matching donation requests
    foodDonations = foodDonations.map((donation) => {
      if (
        donation.donor.emailId == donorEmailId &&
        donation.donationRequestNum == donationRequestNum
      )
        return donation.toJSON();
    });

    // removing null objects
    foodDonationsUpdated = [];
    for (var i = 0; i < foodDonations.length; i++) {
      if (foodDonations[i] != undefined) {
        foodDonationsUpdated.push(foodDonations[i]);
      }
    }

    if (foodDonationsUpdated.length == 0) {
      return res
        .status(200)
        .json({ status: false, desc: "No donation request exists" });
    }

    if (foodDonationsUpdated[0].accepted == true) {
      return res
        .status(400)
        .json({
          status: false,
          desc: "Can't delete the request as it is already accepted by ngo",
        });
    }

    // deleting that donation request
    await FoodDonation.deleteOne({
      donationRequestNum: donationRequestNum,
      donor: foodDonationsUpdated[0].donor._id,
    });

    return res
      .status(200)
      .json({ status: true, desc: "Donation request deleted successfully!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

