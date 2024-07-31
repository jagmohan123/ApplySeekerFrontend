const express = require("express");
const router = express.Router();

const { verify } = require("../middlewares/verify");
const {
  updateProfileImage,
  updateProfileData,
  deleteAccount,
} = require("../controllers/ProfileController");

// update profile image
router.put("/update-image", verify, updateProfileImage);
router.put("/update-profile-info", verify, updateProfileData);
router.delete("/delete-account", verify, deleteAccount);
module.exports = router;
