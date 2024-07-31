const { successFullyApply } = require("../mailTemplate/SuccessFullyApply");
const Application = require("../models/Application");
const Job = require("../models/Job");
const mailSender = require("../utility/mailSender");
const uploadDataCloudinary = require("../utility/uploadCloudinary");
require("dotenv").config();
// apply to the job that is post your application
exports.postApplication = async (req, res) => {
  // console.log("Wr are in application controller!! ");
  try {
    const { firstName, lastName, email, coverLetter, contact, address } =
      req.body;
    let jobID = req.params;
    // we got object id {id:"6676b7373f634ea44267d6ca"} like this but we wanna like this 6676b7373f634ea44267d6ca
    //extract it and convert into a string
    let jobId = jobID.id;

    // console.log("Job id from url parameter",jobId);

    // before applying the job we make sure user should not applied before this job
    const userId = req.user.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job id is not valied ",
      });
    }
    // console.log("Check userid", userId);
    // console.log("given JobID is ", jobId);

    const userAlreadyApplied = await Application.findOne({
      JobId: jobId,
      email: email,
    });
    // console.log("check userAlready applied ", userAlreadyApplied);

    if (userAlreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You are already applied for this position !!!",
        isApplied: true,
      });
    }
    // else {
    // get the resume from req.files
    const resumefile = req.files.resumefile;

    if (!resumefile || !req.files) {
      return res.status(403).json({
        success: false,
        message: "Resume is mandatory, can't be proceed to next feild",
      });
    }

    // upload the resume

    const uploadResume = await uploadDataCloudinary(
      resumefile,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    if (!uploadResume) {
      return res.status(403).json({
        success: false,
        message: "getting error while uploading in cludinary!!!",
      });
    }

    // console.log("UPLOAD RESUME HAVE THESE PROPERTIES ", uploadResume);
    // applicantID get by user who is login and whose role is job seeker
    const applicantID = {
      user: req.user.id,
      role: "Job Seeker",
    };

    if (!jobId) {
      return res.status(403).json({
        success: false,
        message: "jobId is mandetory, can't be empty",
      });
    }
    // get the job with given job id
    const jobInfo = await Job.findById(jobId);
    if (!jobInfo) {
      return res.status(403).json({
        success: false,
        message: "Did not find any job,please give valid job id !!!",
      });
    }

    // console.log("WE GOT JOB BY GIVEN JOB ID IS ", jobInfo);

    // get the empoyer id who post the job
    const employerID = {
      user: jobInfo.postedBy,
      role: "Employer",
    };

    // console.log("Now we have employer id who post the job ", employerID);
    // validate the data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !coverLetter ||
      !contact ||
      !address
    ) {
      return res.status(403).json({
        success: false,
        message: "All feilds are mandetory, can't be empty",
      });
    }
    // console.log("can we reach here ");
    // now all the things is good now apply for the job i.e post the application
    const myApplication = await Application.create({
      firstName,
      lastName,
      email,
      coverLetter,
      contact,
      address,
      applicantID,
      employerID,
      resume: {
        public_id: uploadResume.public_id,
        url: uploadResume.secure_url,
      },
      JobId: jobId,
    });

    // send the notify email to the user that you have successfully applied for the jobs
    mailSender(
      email,
      `${jobInfo?.title}| Application Successfully SUBMITTED`,
      successFullyApply(`${jobInfo?.title}`, firstName)
    );

    // finally return the response
    return res.status(200).json({
      success: true,
      message: "Application Submitted Successfully",
      data: myApplication,
    });
    // }
  } catch (error) {
    // console.log("we got errror in post application controller", error);
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "Can't post application due internal server problem ",
    });
  }
};

// Find all the applied applications employer can see
exports.getAllEmployerApplications = async (req, res) => {
  // console.log("All application employer controller ");
  try {
    // we know if the user is login and user role should be
    // Employer after that he can see the all the user applications who is applied
    const userId = req.user.id;
    // console.log("Login user Id who is Employer");
    // console.log("User id is ",userId);
    const allApplications = await Application.find({
      "employerID.user": userId,
    });
    if (allApplications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "There is no Applicant application's found",
      });
    }

    // return all the apply applications
    return res.status(200).json({
      success: true,
      message: "All Posted Applications are fetched successfully!!!",
      data: allApplications,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "Can't get Posted Applications due to some internal server issues !!!",
      error: error.message,
    });
  }
};

// all the job application which has user applied for job
exports.getAllSeekerApplications = async (req, res) => {
  // console.log("All application, seeker controller ");
  try {
    // we know if the user is login and user role should be
    // job seeker after that he can see the all the applied applications
    const userId = req.user.id;
    // console.log("Login userid is who is job seeker ", userId);

    // if we have an nested object property in db  that time we get "applicantID.user":userId

    const allApplications = await Application.find({
      "applicantID.user": userId,
    });
    if (allApplications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "There is no applied Job application !!!",
      });
    }

    // return all the apply applications
    return res.status(200).json({
      success: true,
      message: "All Applied Jobs Applications are fetched successfully!!!",
      data: allApplications,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "Can't get All applied Applications due to some internal server issues !!!",
      error: error.message,
    });
  }
};

// Job seeker can delete their application
exports.deleteJobSeekerApplication = async (req, res) => {
  // console.log("delete application controller ");
  try {
    // if i wanna delete my applid job application so we have to know about the job id or application id
    // which i wanna delete
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "No Application found !!!",
      });
    }
    // if we get so delete the application
    const deleteApplication = await Application.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Applied application deleted successfully!!!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "Can'tbe deleted Applications due to some internal server issues !!!",
      error: error.message,
    });
  }
};
