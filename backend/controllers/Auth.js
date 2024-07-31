const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const { passwordUpdate } = require("../mailTemplate/PasswordUpdate");
require("dotenv").config();
const mailSender = require("../utility/mailSender");
const crypto = require("crypto");
// for creating the new account in a website i.e signup/register
exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirm_password,
      contact,
      otp,
      role,
    } = req.body;
    // verify the basic details
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirm_password ||
      !role ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "please enter all the details ",
      });
    }

    // verify the password and confirm password
    if (password !== confirm_password) {
      return res.status(403).json({
        success: false,
        message:
          "Password and Confirm Password value not macth please try again ",
      });
    }

    // check  user is already exist or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(403).json({
        success: false,
        message: `User already registered with this email id ${email}`,
      });
    }
    // find the latest otp i mean which send at the last time
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    // console.log("recent otp me target ", recentOtp);
    // if recent otp has not found so
    if (recentOtp.length === 0) {
      return res.status(404).json({
        success: false,
        message: "OTP has not found, Please resend the OTP !!!",
      });
    }

    // match the generated otp ans stored in db
    if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "OTP miss macth , please enter valid otp",
      });
    }

    // if you put invalid email
    if (email !== recentOtp[0].email) {
      return res.status(400).json({
        success: false,
        message: "Email Id miss macth , please enter valid email Id",
      });
    }

    // if all things are ok so we have to hash the password and insert entry in db
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error occured while hashing the password ",
        error: error.message,
      });
    }

    // create the entry
    let approved = "";
    approved === "Employer" ? (approved = false) : (approved = true);

    // for save the entry in profile schema so we have to send the dummy or empty data
    const profileData = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contact: null,
    });

    // finally create the user account
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      contact,
      approved: approved,
      additionalDetails: profileData?._id,
      role: role,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // console.log("User Data is ", user);
    return res.status(201).json({
      success: true,
      message: "User Account created successfully ",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User can not be reagister, Please try again",
      error: error.message,
    });
  }
};

//otp verification
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log("email id is ", email);

    // email is required
    if (!email) {
      return res.status(401).json({
        success: false,
        message: `Email id is required`,
      });
    }

    // check account if email is already registered or not

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(401).json({
        success: false,
        message: ` User already exist corresponding to this email id ${email}`,
      });
    }

    // if not register so generate the otp
    // only we need numeric 6 digit otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // console.log("Otp generated ", otp);

    const entry = await OTP.findOne({ otp: otp });
    // console.log("we get this entry in db related to this otp ", entry);

    // if we are not get valid otp so generate otp till get the correct otp
    while (entry) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      // try to get the entry with newly created otp
      entry = await OTP.findOne({ otp: otp });
    }

    // if otp generated successfully so we have to save email and otp in db
    const otpData = { email, otp };

    // create db entry
    const otpEntry = await OTP.create(otpData);
    // so otp stored in db
    // console.log("Otp model has these value ", otpEntry);

    // finally return the response
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    // console.log(
    //   "OTP nhi mila hai so code  fat gya hai, So Come into in the auth controllers!!!"
    // );
    // console.log("************************************");
    // console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "OTP Can't sent, Internal Server Problem, Please check it in ",
      error: error.message,
    });
  }
};

// for login
exports.Login = async (req, res) => {
  console.log("LOGIN!!!!!!!!!");
  try {
    // fecth the data
    const { email, password, role } = req.body;

    // validate the data
    if (!email || !password || !role) {
      return res.status(403).json({
        success: false,
        message: "User Role,Email and Password All feilds are required ",
      });
    }

    // check user present or not related to given email and password
    let user = await User.findOne({ email })
      .populate("additionalDetails")
      .exec();

    // if there is no data find related to given email so create account
    // console.log("User Login Successfully", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `No Account found corresponding to given email id ${email} `,
      });
    }

    // if Email is registered but user role is different can't be generate the token user register with email and given role after genereatte the token
    if (user.role !== role) {
      return res.status(401).json({
        success: false,
        message: `No Account found corresponding to given email id ${email} with this role ${role}`,
      });
    }

    // if data found so compare the password given password and db password
    // if match so return the user info other wise give the invalid msg

    if (await bcrypt.compare(password, user?.password)) {
      // password match generated the jwt token
      let token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },

        process.env.JWT_SECRET,
        {
          expiresIn: "30h",
        }
      );

      // before give the response we make sure we have to
      //  set the password undefined so user can not view the password in response
      user = user.toObject();
      user.token = token;
      user.password = undefined;

      let options = {
        // cookie expires in 3 days
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // also we have to send the cookie as a response
      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: `Login Successfully`,
        token: token,
        user,
      });
    }

    // password not match so
    else {
      return res.status(404).json({
        success: false,
        message: `Password is incorrect, Please try again later`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "User can not login please try again later, Internal Server Problem",
      error: error.message,
    });
  }
};

// change password from the profile
exports.changePassword = async (req, res) => {
  // console.log("Change Password!!!");
  try {
    // get the user from their id
    const id = req.user.id;
    // console.log("we get id here ", id);
    const userInfo = await User.findById(id);
    // console.log("user details are ", userInfo);
    if (!userInfo) {
      return res.status(404).json({
        success: false,
        message: "User details not found",
      });
    }

    // get the old password and current password values from the req.body
    const { oldPassword, newPassword } = req.body;
    // console.log("OLD PASS", oldPassword, "Curr Pass", newPassword);

    // compare the oldpassword with database password
    if (!(await bcrypt.compare(oldPassword, userInfo.password))) {
      return res.status(403).json({
        success: false,
        message: "Please enter the correct current password ",
      });
    }

    // create the new password
    let hashNewPassword;
    try {
      hashNewPassword = await bcrypt.hash(newPassword, 10);
      // update the user schema
      // console.log("Hashing new password value is =>", hashNewPassword);
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Error occured during hasing the new password ",
        error: error.message,
      });
    }

    // update the password in user schema
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { password: hashNewPassword },
      { new: true }
    );

    const url = `${process.env.ORIGIN}/login`;
    // password update ke andar 2 hee parameter hai 3rd url hai jo pass karna hai bad me
    // Notify the user by email id that tells you successfully updated your password
    try {
      const emailOutPut = await mailSender(
        updatedUser.email,
        "Password reset Successfully For ApplySeeker!!! ",
        passwordUpdate(
          updatedUser?.email,
          `Password updated successfully for ${updatedUser?.firstName} ${updatedUser?.lastName}`,
          url
        )
      );
      // console.log("email response is ", emailOutPut);
    } catch (error) {
      // console.log("error of password change =>", error);
      return res.status(500).json({
        success: false,
        message:
          "Error occured while sending email for updating password the password",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password Updated successfully",
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: error.message,
      message:
        "Failed to change the password due to internal server problem !!",
    });
  }
};

// Forgot password  that means change from login or signup page directally by email link  2 step process

// step-1 Reset Password Token

exports.resetToken = async (req, res) => {
  // console.log("RESET TOKEN ");
  try {
    // step1 get the email id
    const { email } = req.body;
    // console.log("GOT EMAIL", email);
    // check user is register or not with this id
    const checkUserExist = await User.findOne({ email: email });
    // console.log("USER GOT WITH EMAIL", checkUserExist);
    if (!checkUserExist) {
      return res.status(404).json({
        success: false,
        message: `There is no Account found with this ${email} is , Please SignUp !!!`,
      });
    }

    // step 2 user has registered already so generate the token and update in db and set the expires time
    // generate the 20 character and change in hex form and make the string
    const token = crypto.randomBytes(20).toString("hex");
    // console.log("check token", token);
    const userSchema = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        // token expires with in 10min
        resetPasswordExpires: Date.now() + 10 * 60 * 1000,
      },
      { new: true }
    ).exec();

    // console.log("Updated User DB ", userSchema);

    // make the url which is send in email by which user can change their password
    let url = `${process.env.ORIGIN}/change-password/${token}`;

    // send the email to the user
    await mailSender(
      email,
      "Password Reset Link !!! ",
      `We received a request to reset the password for your account \n. 
       If you made this request, please click the link below to reset your password.
      ${url}`
    );
    return res.status(200).json({
      success: true,
      message: "Reset Password Email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error occured while sending the reset Password link ",
    });
  }
};

// step-2 Reset Password
exports.resetPassword = async (req, res) => {
  // console.log("we are in reset password");
  try {
    // fetch the data/ we'll get 3 things
    // frontend put the token in body
    const { password, confirm_password, token } = req.body;
    // console.log("Confirm pass=>", confirm_password, "passwprd=>", password);
    // console.log("Token value ", token);
    // validation
    if (confirm_password !== password) {
      return res.status(403).json({
        success: false,
        message: "Password and confirm_Password value not match ",
      });
    }
    // find the user details from the db
    const userDetails = await User.findOne({ token: token });
    // console.log("Given user by given token", userDetails);

    if (!userDetails) {
      return res.status(403).json({
        success: false,
        message: `Token is invalid, Please regenerate the Reset Password link  `,
      });
    }

    // check the token time agar token kee validity end ho gai ho tab
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(403).json({
        success: false,
        message: `Token has expired, Please regenerate it.} `,
      });
    }
    // console.log("user email is ==>", userDetails.email);
    // if every thing ok now hash the password
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error occured while hashing the password ",
        error: error.message,
      });
    }

    // update the password
    const use = await User.findOneAndUpdate(
      { token: token },
      { password: hashPassword },
      { new: true }
    );
    // console.log("upadetd user is", use);

    // create the url for frent-end
    const url = `${process.env.ORIGIN}/login`;
    // console.log("user upfate=>>>>", use.email);
    await mailSender(
      `${use.email}`,
      "Password Reset Successfully",
      passwordUpdate(use.email, userDetails.firstName, url)
    );
    // return the response
    return res.status(200).json({
      success: true,
      message: " Password Reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: " Error occured while reseting Password  hjgdjasg. ",
    });
  }
};

//Logout
exports.Logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logged Out Successfully.",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "Getting Errror while Logging Out, Due to some internal server .",
    });
  }
};

// login user all data
exports.getUserInfo = async (req, res) => {
  try {
    const userid = req.user.id;
    const userData = await User.findById(userid)
      .populate("additionalDetails")
      .exec();
    return res.status(200).json({
      success: true,
      data: userData,
      message: "User Data fetched",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "No user found",
      error: error.message,
    });
  }
};
