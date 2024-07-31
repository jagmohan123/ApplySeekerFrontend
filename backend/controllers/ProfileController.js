// Update the display image of user in profile
const uploadDataCloudinary = require("../utility/uploadCloudinary");
const User = require("../models/User");
const Profile = require("../models/Profile");

// Update the Profile DP
exports.updateProfileImage = async (req, res) => {
  try {
    // take about spelling and name whatever name you
    //  used in when you make request from the postman or thunder same name should be use here
    // first fecth user profile image from req.files. imageName(keyName )
    const displayImage = req.files.profileImage;
    // console.log("display image looks like ", displayImage);
    const userId = req.user.id;
    // console.log("User id is ", userId);
    // console.log("profile folder ", process.env.PROFILE_IMAGE_FOLDER);
    // upload the profile image in cloudinary
    const imageUpload = await uploadDataCloudinary(
      displayImage,
      process.env.PROFILE_IMAGE_FOLDER,
      1000,
      1000
    );
    // console.log("Finally Upload image has these properties ", imageUpload);

    // update the image also db corresponding to given id
    const updatedUserDB = await User.findByIdAndUpdate(
      { _id: req.user.id },
      {
        image: imageUpload.secure_url,
      },
      { new: true }
    );

    // console.log("Updated user is ", updatedUserDB);
    return res.status(201).json({
      success: true,
      message: `Profile Image Updated successfully`,
      data: updatedUserDB,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't Update profile Picture, Internal Server Problem ",
      error: error.message,
    });
  }
};

// Update the Profile Data like dob, about , phone,gender

exports.updateProfileData = async (req, res) => {
  // console.log("Update profile data controller");
  try {
    const {
      dateOfBirth = "",
      about = "",
      contact = "",
      gender = "",
    } = req.body;

    // find the user id
    const id = req.user.id;
    // console.log(id);
    // user data with id
    const userInfo = await User.findById(id);
    // console.log("user", userInfo);
    if (!userInfo) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    // if user found so it should have profile also
    // console.log(
    //   "Try to get the profile id ",
    //   userInfo.additionalDetails.toString()
    // );
    // profile id is coming in the form of object so we have to convert in string
    const ProfileId = userInfo.additionalDetails.toString();
    // console.log("Now we have profile id is ", ProfileId);
    const profile = await Profile.findById(ProfileId);

    // console.log("Profile id ", profile);
    // update the user schema
    const user = await User.findByIdAndUpdate(id);

    // save the updated date in user schema
    user.save;

    // update the additional profile
    // we allready create the object so instead of
    // creat() method we use here save() method

    profile.dateOfBirth = dateOfBirth;
    profile.gender = gender;
    profile.contact = contact;
    profile.about = about;
    await profile.save();

    const updatedUserDB = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    // console.log("update details is ", updatedUserDB);
    return res.status(200).json({
      success: true,
      message: "Profile Info has been updated successfully",
      data: updatedUserDB,
    });
  } catch (error) {
    // console.log("Error in UpDate controller", error);
    res.status(500).json({
      success: false,
      error: error.message,
      message:
        "Error Occured while updating the profile data, Internal server Problem ",
    });
  }
};

// delete Account

// delete user profile
exports.deleteAccount = async (req, res) => {
  console.log("Inside delete con");
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: `Please Login before deleting your account`,
      });
    }
    const user = await User.findById({ _id: userId });

    // console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: ` No user exist corresponsing to this user id ${userId}`,
      });
    }

    // Employer can't delete there profile
    if (user?.role === "Employer") {
      return res.status(500).json({
        success: false,
        message: "You are an Employer can't delete your Account",
      });
    }

    // if user found to we have to delete the user account from the db
    await User.findByIdAndDelete(userId);
    return res.status(200).json({
      success: true,
      message: "User Account has been deleted ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Getting error while deleting the user account ",
      error: error.message,
    });
  }
};
