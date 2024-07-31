const express = require("express");
const router = express.Router();

const { verify, isEmployer, isJobSeeker } = require("../middlewares/verify");
const {
  createJob,
  updateJob,
  deleteJob,
  allJob,
  singleJob,
  getMyAllJobs
} = require("../controllers/JobController");

// Create the JOB
router.post("/post", verify, isEmployer, createJob);

// update single job by their id
router.put("/update-job/:id", verify, isEmployer, updateJob);

//Delete single job by their id
router.delete("/deleted-job/:id", verify, isEmployer, deleteJob);

//Get all the job
router.get("/all-job", allJob);

// get single job
router.get("/specific-job/:id",verify, singleJob);

// all the job which is created by employer
router.get("/my-all-job",verify, isEmployer,getMyAllJobs);


module.exports = router;
