const Donor = require("../models/donor");
const FoodDonation = require("../models/foodDonation");
const UploadImage = require("../models/uploadImage");
const NgoDonationRequest = require("../models/ngoDonationRequest");
const BlockedUsers = require("../models/blockedUsers");
const router = require("../routes");
const mongoose = require("mongoose");
const path = require("path");
const { monitorEventLoopDelay } = require("perf_hooks");
const { builtinModules } = require("module");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const Ngo = require("../models/ngo");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../helpers/secretToken");

/** donor controller, which will send auth-token on successful login
 *  res : { status: boolean, token: string, desc: string }
 */
module.exports.donorLogin = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const blocked = await BlockedUsers.findOne({ emailId: emailId });
    if (blocked) {
      return res.status(400).json({ status: false, desc: "You are blocked by admin!!" });
    }
    const donor = await Donor.findOne({ emailId: emailId });

    if (!donor) {
      return res
        .status(400)
        .json({ status: false, desc: "Incorrect Password or Email-id" });
    }

    const validPassword = await bcrypt.compare(password, donor.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ status: false, desc: "Incorrect Password or Email-id" });
    }

    const token = createSecretToken(donor._id);
    res.status(200).json({
      status: true,
      token: token,
      message: "User logged in successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

/** function to send email to donor after successful registration
 *  params : (name, emailId)
 */
var notifyDonorRegistration = async (name, emailId) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: emailId,
    name: name,
    subject: "Welcome to Daan Network!!",
    html: `<div>
    <br/>
    <h3 style="color:rgb(56, 80, 56);">Dear ${name},</h3>
    </div>
    <div style="text-align: center; color: rgb(56, 80, 56)">
        <h1>Welcome to DaanNetwork!!</h1>
    </div>
    <div style="text-align: center; color: rgb(66, 103, 66)">
        <h2>Thank you for joining us in our mission to make the world a better place. We are excited 
            to have you as a part of our community. We are looking forward to working with you and making 
            a difference in the society.
        </h2>
    </div>
    <div style="text-align: center; color: rgb(66, 103, 66)">
        <h3>Your commitment to supporting our NGO's mission is truly appreciated. By connecting with us, 
            you're helping to bridge the gap between surplus food and those in need. Your generosity will 
            directly impact communities by ensuring that nutritious meals reach those who need them most. 
            Together, we can make a significant difference in combating hunger and food insecurity. We look forward 
            to partnering with you to create positive change. Thank you for your support!
        </h3>
    </div>
    <div>
        <img src="cid:myimg" alt="DaanNetwork" style="display: block; margin-left: auto; margin-right: auto; width: 50%; margin-top:3%; margin-bottom:2%;"/>
    </div>
    <div style="margin-top:6%;">
        <h3 style="color: rgb(66, 103, 66);">Regards<br/>DaanNetwork Family<h3/>
        <a href="" style="cursor: pointer; color:blue;">Click here to go to website.</a>
    </div>
    <br/>
    <br/>
    <br/>
    <div style="color: red;">
      Note: Please do not reply directly to this e-mail. This e-mail was sent
      from a notification-only address that cannot accept incoming e-mail.
    </div>
  </div> `,
    attachments: [
      {
        filename: "donor_email_pic.jpg",
        path: path.resolve(__dirname, "../../api/views/donor_email_pic.jpg"),
        cid: "myimg",
      },
    ],
  };

  transporter.sendMail(mailOptions, (err, success) => {
    if (err) {
      console.log(err);
    }
  });
};

/** donor controller to create donor
 * req body : { name, phone, alt_phone, emailId, birthdate, password, address, city, state, zip_code, gender,
 * nationality}
 * res : { status:boolean,desc:string }
 */
module.exports.createDonor = async (req, res) => {
  try {
    const {
      name,
      phone,
      alt_phone,
      emailId,
      birthdate,
      password,
      address,
      city,
      state,
      zip_code,
      gender,
      nationality,
    } = req.body;

    // check if donor with this email already exists or not
    var donors = await Donor.find({ emailId: emailId });
    if (donors.length != 0) {
      return res.status(400).json({
        status: false,
        desc: "Donor already exists with this Email!!",
      });
    }
    var donors = await Donor.find({ phone: phone });
    if (donors.length != 0) {
      return res.status(400).json({
        status: false,
        desc: "Donor already exists with this Contact Number!!",
      });
    }

    var hashPassword = await bcrypt.hash(password, 10);

    let newDonor = await Donor.create({
      name: name,
      phone: phone,
      alt_phone: alt_phone,
      emailId: emailId,
      birthdate: birthdate,
      address: address,
      gender: gender,
      password: hashPassword,
      city: city,
      state: state,
      zip_code: zip_code,
      nationality: nationality,
    });

    notifyDonorRegistration(name, emailId);

    res.status(201).json({ status: true, desc: "Donor created successfully" });
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
    const { quantity, pickUpDate, description, pickUpLocation, items, imageUrl } =
      req.body;

    const donorEmailId = req.user.emailId;

    // if no image is attached
    var imagesArray = [];
    imagesArray = [imageUrl];
    // if (req.file) {
    //   let imageName = new Date().getMinutes() + req.file.originalname;
    //   imagesArray = [imageName.toString()];
    // }

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
    var array = await FoodDonation.find({ donor: donors[0]._id });
    var maxNum = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i].donationRequestNum > maxNum) {
        maxNum = array[i].donationRequestNum;
      }
    }

    // creating food donation request
    let foodDonation = await FoodDonation.create({
      donationRequestNum: maxNum + 1,
      quantity: quantity,
      pickUpDate: pickUpDate,
      createdAt: new Date(),
      description: description,
      images: imagesArray,
      pickUpLocation: pickUpLocation,
      donor: donors[0]._id,
      accepted: false,
      items: items,
    });

    res.status(200).json({ status: true, desc: "Donation request created" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

/** donor controller to see my all accepted donation requests
 * req user : { donorEmailId }
 * res : { status:boolean, desc:string }
 */
module.exports.getAllAcceptedDonationRequests = async (req, res) => {
  const donorEmailId = req.user.emailId;
  try {
    const donors = await Donor.find({ emailId: donorEmailId });
    // no donor with given email
    if (donors.length == 0) {
      return res
        .status(400)
        .json({ status: false, desc: `No donor with email ${donorEmailId}` });
    }

    var foodDonations = await FoodDonation.find({ accepted: true })
      .populate("donor")
      .populate("ngo")
      .exec();

    foodDonations = (await foodDonations).map((donation) => {
      if (donation.donor.emailId == donorEmailId) return donation.toJSON();
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

    return res.status(200).json({ status: true, foodDonations: foodDonationsUpdated });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
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

/** donor controller to upload images for donation items to file-sytem
 * req body : {}
 * res : { status:boolean, desc:string }
 */
module.exports.uploadDonationImages = async (req, res) => {
  try {
    let image = await UploadImage.create({
      imageName: Date.now() + path.extname(req.file.originalname),
    });
    return res.status(200).json({ status: true, desc: "Image uploaded !!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

/** donor controller to see my all pending donation requests
 * req user : { donorEmailId }
 * res : { status:boolean, desc:string | foodDonations: List }
 */
module.exports.getAllDonations = async (req, res) => {
  const donorEmailId = req.user.emailId;
  try {
    const donors = await Donor.find({ emailId: donorEmailId });
    // no donor with given email
    if (donors.length == 0) {
      return res
        .status(400)
        .json({ status: false, desc: `No donor with email ${donorEmailId}` });
    }

    var foodDonations = await FoodDonation.find({ accepted: false })
      .populate("donor")
      .populate("ngo")
      .exec();

    foodDonations = (await foodDonations).map((donation) => {
      if (donation.donor.emailId == donorEmailId) return donation.toJSON();
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

    return res.status(200).json({ status: true, foodDonations: foodDonationsUpdated });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

/** function to notify donor about their successful application to donation drive
 * params: (drive, donor)
 */
var notifyNewDonorForDrive = async (drive, donor) => { };

var notifySuccessfulDriveApplication = async (drive, application, donor) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("../src/api/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("../src/api/views"),
    extName: ".handlebars",
  };
  transporter.use("compile", hbs(handlebarOptions));

  let mailOptions = {
    from: process.env.EMAIL,
    to: donor.emailId,
    subject:
      "Congratulations! Your application to donation drive was successful",
    context: {
      title: "Successfully Applied to Donation Drive",
      email: donor.emailId,
      donor: donor,
      drive: drive,
      application: application,
    },
    template: "donor_donation_drive",
  };

  transporter.sendMail(mailOptions, (err, success) => {
    if (err) {
      console.log(err);
    }
    console.log("Email sent successfully!!");
  });
};

var notifyDonorApplicationNGO = async (drive, application, donor) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("../src/api/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("../src/api/views"),
    extName: ".handlebars",
  };
  transporter.use("compile", hbs(handlebarOptions));

  let mailOptions = {
    from: process.env.EMAIL,
    to: drive.ngo.emailId,
    subject:
      `Donor has applied to ${drive.description.name}`,
    context: {
      title: "Successfully Applied to Donation Drive",
      email: donor.emailId,
      donor: donor,
      drive: drive,
      application: application,
    },
    template: "ngo_donation_drive",
  };

  transporter.sendMail(mailOptions, (err, success) => {
    if (err) {
      console.log(err);
    }
    console.log("Email sent successfully!!");
  });
};

/** donor controller to apply for donation drive created by ngo
 * req user : { donorEmailId }
 * req : { donationDetails, donationRequestId }
 *   donationDetails: {
 *      items: Array,
 *      pickUpDate: Date,
 *      pickUpAddress:String,
 *      description: String
 *   }
 */
module.exports.applyForDonationDrive = async (req, res) => {
  const donorEmailId = req.user.emailId;
  const { donationRequestId, donationDetails } = req.body;

  try {
    var donor = await Donor.find({ emailId: donorEmailId });
    if (donor.length == 0)
      return res
        .status(400)
        .json({ status: true, msg: "No donor with this email" });

    var donationRequest = await NgoDonationRequest.findById(donationRequestId);
    if (donationRequest == null)
      return res.status(400).json({ status: false, msg: "Invalid donationID" });
    var ngoID = donationRequest.ngo;

    const donor_obj = {
      donor: donor[0]._id,
      donation_items: donationDetails.items,
      pickUpDate: donationDetails.pickUpDate,
      pickUpAddress: donationDetails.pickUpAddress,
      description: donationDetails.description,
    };

    donationRequest.donors = [...donationRequest.donors, donor_obj];
    donationRequest.donors[donationRequest.donors.length - 1].donation_ītems =
      donor_obj.donation_items;
    console.log(donationRequest);
    var upDatedReq = await donationRequest.save();
    var ngo = await Ngo.findById(ngoID);
    if (ngo == null)
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server Error" });

    console.log(upDatedReq);
    donor_obj.emailId = donorEmailId;
    var tempDriveObj = upDatedReq.toObject();
    tempDriveObj.ngo = ngo.toObject();
    donor_obj.pickUpDate = new Date(
      donor_obj.pickUpDate.toString(),
    ).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    notifySuccessfulDriveApplication(
      tempDriveObj,
      donor_obj,
      donor[0].toObject(),
    );

    notifyDonorApplicationNGO(
      tempDriveObj, donor_obj, donor[0].toObject()
    );
    res.status(200).json({ status: true, msg: upDatedReq });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

/** donor controller to get all ngo donation drives
 * view all donation drives
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
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

/** donor controller to delete donation request
 * req user : { donorEmailId }
 * req body : { donationRequestNum }
 * res: res : { status:boolean, desc:string }
 */
module.exports.deleteDonationRequest = async (req, res) => {
  const donorEmailId = req.user.emailId;
  try {
    const { donationRequestNum } = req.body;

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
    var foodDonations = await FoodDonation.find({ accepted: false })
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
      return res.status(400).json({
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

/** delete application to donation drive
 * get donation drives donor has applied to
 * req body: { donorEmailId }
 */
module.exports.getAllAppliedDrives = async (req, res) => {
  const { donorEmailId } = req.body;
  try {
    var donor = await Donor.find({ emailId: donorEmailId });
    if (donor.length == 0)
      return res
        .status(400)
        .json({ status: false, msg: "No donor with this email" });

    var donation_drives = await NgoDonationRequest.find({})
      .populate("ngo")
      .exec();
    if (donation_drives.length == 0)
      return res.status(200).json({ status: false, drives: [] });
    //  console.log(donor[0]._id);
    var myDonationDrives = [];
    for (let i = 0; i < donation_drives.length; i++) {
      var myDons = donation_drives[i].donors.filter((item) =>
        item.donor.equals(donor[0]._id),
      );
      // for (let j = 0; j < donation_drives[i].donors.length; j++) {
      //   // console.log(donation_drives[i].donors[j].donor)

      //   // console.log(donation_drives[i].donors[j].donor.equals(donor[0]._id))
      //   if () {
      //     myDons.push(donation_drives[i].donors[j])
      //   }

      if (myDons.length > 0) {
        myDonationDrives.push({
          donationRequestNum: donation_drives[i].donationRequestNum,
          createdAt: donation_drives[i].createdAt,
          startDate: donation_drives[i].startDate,
          endDate: donation_drives[i].endDate,
          description: donation_drives[i].description,
          ngo: donation_drives[i].ngo,
          donors: myDons,
        });
      }
    }
    res.status(200).json({ status: true, donationDrives: myDonationDrives });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err });
  }
};

/** delete application to donation drive
 * req body: { donorEmailId, donationDriveId }
 * res : { status:boolean, desc:string }
 */
module.exports.deleteApplicationToDrive = async (req, res) => {
  const { donorEmailId, donationDriveId } = req.body;
  try {
    var donor = await Donor.find({ emailId: donorEmailId });
    if (donor.length == 0)
      return res
        .status(400)
        .json({ status: false, msg: "No donor with this email" });

    var donation_drives = await NgoDonationRequest.find({
      _id: donationDriveId,
    })
      .populate("ngo")
      .exec();
    if (donation_drives.length == 0)
      return res
        .status(200)
        .json({ status: false, msg: "no donation req exists" });
    var message = "";
    var newDonors = donation_drives[0].donors.filter(
      (item) => !item.donor.equals(donor[0]._id),
    );
    if (newDonors.length === donation_drives[0].donors.length)
      message = "You have no donations in this drive";
    else message = "deleted successfully";
    donation_drives[0].donors = newDonors;
    console.log(donation_drives[0].donors);
    await donation_drives[0].save();
    res.status(200).json({ status: true, msg: message });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err });
  }
};

/** donor controller to modify the donation
 *  req user : { donorEmailId }
 *  req body : { donationRequestNum, description, items, quantity, pickUpLocation, pickUpDate }
 *  res : { status:boolean, desc:string }
 */
module.exports.modifyDonationRequest = async (req, res) => {
  const donorEmailId = req.user.emailId;

  try {
    const {
      donationRequestNum,
      description,
      items,
      quantity,
      pickUpLocation,
      pickUpDate,
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

    // updating the donation request
    const updatedResult = await FoodDonation.findOneAndUpdate(
      { donationRequestNum: donationRequestNum, donor: donors[0]._id },
      {
        $set: {
          description: description,
          items: items,
          quantity: quantity,
          pickUpLocation: pickUpLocation,
          pickUpDate: pickUpDate,
        },
      },
    );

    return res
      .status(200)
      .json({ status: true, desc: "Donation request updated successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }
  }
};

/** donor controller to display user profile
 * req user : {donorEmailId}
 * req body : {}
 * res : { status:boolean, donor:donor_object }
 */
module.exports.getMyProfile = async (req, res) => {
  const donorEmailId = req.user.emailId;
  try {
    const donors = await Donor.find({ emailId: donorEmailId });

    // no donor with given email
    if (donors.length == 0) {
      return res
        .status(400)
        .json({ status: false, desc: `No donor with email ${donorEmailId}` });
    }

    // do not send password in frontend
    var donorSend = donors[0];
    donorSend.password = "";

    return res.status(200).json({ status: true, donor: donorSend });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

/** donor controller to delete user profile
 * req user : {donorEmailId}
 * req body : {}
 * res : { status:boolean, desc:string }
 */
module.exports.deleteMyProfile = async (req, res) => {
  const donorEmailId = req.user.emailId;
  try {
    const donors = await Donor.find({ emailId: donorEmailId });

    // no donor with given email
    if (donors.length == 0) {
      return res
        .status(400)
        .json({ status: false, desc: `No donor with email ${donorEmailId}` });
    }
    var donorId = donors[0]._id;

    // delete all food donation requests associated with this donor
    var foodDonations = await FoodDonation.find({})
      .populate("donor")
      .populate("ngo")
      .exec();

    var foodDonationsIds = [];
    foodDonationsIds = (foodDonations).map((donation) => {
      if (donation.donor.emailId == donorEmailId) return donation._id;
    });

    var foodDonationsIdsUpdated = [];
    for (var i = 0; i < foodDonationsIds.length; i++) {
      if (foodDonationsIds[i] != undefined) {
        foodDonationsIdsUpdated.push(foodDonationsIds[i]);
      }
    }

    for (var donationId of foodDonationsIdsUpdated) {
      await FoodDonation.deleteOne({ _id: donationId });
    }

    // delete donor details from ngo drives in which donor has participated
    const filter = {
      "donors.donor": donorId
    }
    const update = {
      $pull: { donors: { donor: donorId } }
    };
    await NgoDonationRequest.updateMany(filter, update);

    // delete donor from donor collection
    await Donor.deleteOne({ emailId: donorEmailId });

    return res.status(200).send({ status: true, desc: "Donor account deleted successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
}

module.exports.getAllDonors = async (req, res) => {
  try {
    var donor = await Donor.find({})
    return res.status(200).json({ status: true, donor: donor })
  } catch (err) {
    return res.status(500).json({ status: false, msg: err })
  }
}