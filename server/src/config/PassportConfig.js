const LocalStrategy = require("passport-local").Strategy;
const Donor = require("../api/models/donor");
const bcrypt = require("bcrypt");

module.exports.initializePassport = (passport) => {
  const authenticateUser = async (emailId, password, done) => {
    try {
      const user = await Donor.findOne({ emailId: emailId });
      if (!user) {
        return done(null, false, { message: "No user with this email !" });
      }
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "emailId",
      },
      authenticateUser,
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    return done(null, await Donor.findById(id));
  });
};
