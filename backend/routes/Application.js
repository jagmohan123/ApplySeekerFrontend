const express = require("express");
const router = express.Router();

const { verify, isJobSeeker, isEmployer } = require("../middlewares/verify");
const {
  postApplication,
  getAllEmployerApplications,
  getAllSeekerApplications,
  deleteJobSeekerApplication,
} = require("../controllers/ApplicationController");

router.post("/apply-job/:id", verify, isJobSeeker, postApplication);
router.get(
  "/all-jobs-applications",
  verify,
  isEmployer,
  getAllEmployerApplications
);
router.get(
  "/all-applied-applications",
  verify,
  isJobSeeker,
  getAllSeekerApplications
);


router.delete("/delete-application/:id",verify,isJobSeeker,deleteJobSeekerApplication)
module.exports = router;
