// only employer can create the job or post the job info

const Job = require("../models/Job");

// creating a job this is we are creating a post
exports.createJob = async (req, res) => {
  // console.log("JOB CONTROLLER");
  try {
    const role = req.user;
    // console.log("USER has", role);
    // if (role === "Job Seeker") {
    //   return res.status(400).json({
    //     success: false,
    //     message:
    //       "You are not a employer , please login with employer account !!!",
    //   });
    // }

    // if user has valid right so they can make the post
    const {
      title,
      description,
      category,
      country,
      city,
      location,
      salaryType,
      fixedSalary,
      salaryFrom,
      salaryTo,
    } = req.body;

    // console.log(
    //   "Title is ",
    //   title,
    //   "\n",
    //   "description is ",
    //   description,
    //   "\n",
    //   "category is ",
    //   category,
    //   "\n",
    //   "country is ",
    //   country,
    //   "\n",
    //   "city is ",
    //   city,
    //   "\n",
    //   "location is ",
    //   location,
    //   "\n",
    //   "Salary is ",

    //   fixedSalary,
    //   "\n",
    //   "Salary Type",
    //   "\n",
    //   salaryType
    // );

    // apply the validation
    if (
      !title ||
      !description ||
      !category ||
      !country ||
      !city ||
      !location ||
      !salaryType
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the information ",
      });
    }

    // You can only select fixed salary or ranged salry b/w both you can only select one at a time

    if (salaryType === "Fixed Salary") {
      if (!fixedSalary) {
        return res.status(400).json({
          success: false,
          message: "Please  provide fixed salary.",
        });
      }
    }

    if (salaryType === "Ranged Salary") {
      if (!salaryFrom && !salaryTo) {
        return res.status(400).json({
          success: false,
          message: "Please either provide  ranged salary.",
        });
      }
    }

    // can't enter both
    // if (salaryFrom && salaryTo && fixedSalary) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Can't entered fixed salary or ranged salary together .",
    //   });
    // }

    // user post the job
    const postedBy = req.user.id;
    // console.log("user id who is posting ", postedBy);
    // if all things have filled carefully so make entry in db

    const newJob = await Job.create({
      title,
      description,
      category,
      country,
      city,
      location,
      salaryType,
      fixedSalary,
      salaryFrom,
      salaryTo,
      postedBy,
    });

    return res.status(200).json({
      success: true,
      message: "Job Posted Successfully!",
      date: newJob,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "Can't Create the Job due to internal server problem !!!",
    });
  }
};

// updating a job
exports.updateJob = async (req, res) => {
  // console.log("Update the job controller ");
  try {
    // get the job id from the req. params after check the jon exist or not
    const { id } = req.params;
    // console.log("JOB ID is ", id);
    const job = await Job.findById(id);
    // console.log("JOB data related to given id is ", job);
    if (!job) {
      return res.status(200).json({
        success: false,
        message: `No Job found with given job id ${id}`,
      });
    }

    // update the job schema
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      useFindAndModify: false,
    });

    // console.log("Updated Job Data is ", updatedJob);
    return res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      data: updatedJob,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "Can't be updated the Job due to internal server problem !!!",
    });
  }
};

// delete the job

exports.deleteJob = async (req, res) => {
  // console.log("Delete job controller ");
  try {
    // get the job id from the req. params after check the jon exist or not
    const { id } = req.params;
    // console.log("JOB ID is ", id);
    const job = await Job.findById(id);
    // console.log("JOB data related to given id is ", job);
    if (!job) {
      return res.status(200).json({
        success: false,
        message: `No Job found with given job id ${id}`,
      });
    }

    // update the job schema
    const deleteJob = await Job.findByIdAndDelete(id);

    const allRemaiingJob = await Job.find();
    // console.log("Deleted Job Data is ", allRemaiingJob);
    return res.status(200).json({
      success: true,
      message: "Job Deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "Can't be Deleted the Job due to internal server problem !!!",
    });
  }
};

// Get all The job
exports.allJob = async (req, res) => {
  // console.log("All job controller ");
  try {
    //only jo jobs expired nhi hui
    const allJob = await Job.find({ expired: false });
    if (!allJob) {
      return res.status(404).json({
        success: false,
        message: `There is no Job available for this time `,
      });
    }
    // console.log("Available All Jobs are ", allJob);
    return res.status(200).json({
      success: true,
      message: "All jobs are fetched successfully",
      data: allJob,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "Can't be get all the Jobs, due to internal server problem !!!",
    });
  }
};

// Get Single Jobs

exports.singleJob = async (req, res) => {
  // console.log("Single job controller ");
  try {
    // get the job id from the req. params after check the jon exist or not
    const { id } = req.params;
    // console.log("JOB ID is ", id);
    const job = await Job.findById(id);
    // console.log("JOB info related to given job id is ", job);
    if (!job) {
      return res.status(200).json({
        success: false,
        message: `No Job found with given job id ${id}`,
      });
    }

    // console.log("singleJob Job Data is ", job);
    return res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      data: job,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "Can't  get the Job, due to internal server problem !!!",
    });
  }
};

// employer all jobs
exports.getMyAllJobs = async (req, res) => {
  // console.log("Get My ALL  job controller ");
  try {
    // get the employer id from the req. params ,
    // console.log("user ", req.user);
    const allMyjob = await Job.find({ postedBy: req.user.id });
    // console.log("allMyjob Jobs are ", allMyjob);

    if (!allMyjob) {
      return res.status(404).json({
        success: false,
        message: `No Job found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "My all Job fetched successfully",
      data: allMyjob,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "Can't  get the All My Jobs, due to internal server problem !!!",
    });
  }
};
