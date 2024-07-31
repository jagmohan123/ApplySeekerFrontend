const express = require("express");
const router = express.Router();
const {
  sendOtp,
  signup,
  Login,
  changePassword,
  resetToken,
  resetPassword,
  Logout,
  getUserInfo,
} = require("../controllers/Auth");

const { updateProfileImage } = require("../controllers/ProfileController");
const { verify } = require("../middlewares/verify");
// For Login
router.post("/login", Login);

// // For Signup
router.post("/signup", signup);

// For send Otp
router.post("/sendotp", sendOtp);

// // if we want to change the password from the profile
// //  so you need to login 1st after you access the profile and make the
// // api call to reset the password
// router.post("/change-password", verify, changePassword);

// update profile image
router.put("/update-image", verify, updateProfileImage);

// For forgot password change by login or signup page i.e we need 1st reset the token and send the link in email to
// change the password
// generating a reset password token
router.post("/reset-password-token", resetToken); //done

//  reset user password after verification
router.post("/reset-password", resetPassword); //done

router.post("/logout", Logout);


// get user bio data
router.get("/get-user", verify, getUserInfo);
module.exports = router;
