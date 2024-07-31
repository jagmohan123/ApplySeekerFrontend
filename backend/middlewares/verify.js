const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
// verify the user role after given permission to access the protected route
exports.verify = async (req, res, next) => {
  // spelling ka dyan rkhana hai
  // get the token from anywhere like cookie, token or header
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    // console.log("Token has value =>", token);
    if (!token) {
      return res.status(403).json({
        success: false,
        message:
          "Token is not found, make sure you should be login before accessing protected route ",
      });
    }
    // verifying the token with our jwt secret
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      // console.log("After decode the token these value has we got ==>", decode);
      // insert the decoded data into user so we can access from the user if we need any data
      req.user = decode;
      // console.log("request body ke andar user", req.user);
    } catch (error) {
    
      return res.status(401).json({
        success: false,
        message: "Invalid Token ",
      });
    }
    // console.log("we reach here ");

    // go to the next middleware or controller
    next();
  } catch (error) {
    return res.status(401).json({
      error: error?.message,
      success: false,
      message: " Something went wrong while verifying the token,Please Login when you try to access protected route",
    });
  }
};

// for job seeker person  i.e a person who need a job  so for that person
exports.isJobSeeker = async (req, res, next) => {
  // console.log("yes");
  try {
    // we already set the email inside the token wo we can fetch from there bcs we already decode the token
    const userInfo = await User.findOne({ email: req.user.email });
    if (userInfo.role !== "Job Seeker") {
      return res.success(403).json({
        success: false,
        message:
          "This is a protected route for Job Seeker who apply for the job!!! ",
        Logs: "Try to login with different role !!!",
      });
    }

    // and move to the next controller or middleware
    next();
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "User role can'nt be verified, please try again!!! ",
    });
  }
};

// for employer who post the job i.e provider
exports.isEmployer = async (req, res, next) => {
  try {
    // we already set the email inside the token wo we can fetch from there bcs we already decode the token
    const userInfo = await User.findOne({ email: req.user.email });
    if (userInfo.role !== "Employer") {
      return res.success(403).json({
        success: false,
        message: "This is a protected route for Employer who post the jobs  ",
        Logs: "Try to login with different role !!!",
      });
    }

    // and move to the next controller or middleware
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role can'nt be verified, please try again!!! ",
    });
  }
};
