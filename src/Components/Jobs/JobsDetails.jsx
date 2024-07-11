import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
function JobsDetails() {
  // console.log("JOB ITEM IS SPECIFIC PAGE IS ");
  // extraxt the job id from the url it gives an object
  let jobid = useParams();
  // convert an object into a value but it gives an array
  let myJob = Object.values(jobid);
  const location = useLocation();
  const [singleJob, setSingleJob] = useState();
  const { token, user } = useSelector((state) => state.auth);
  // we need first thing i.e job id thatswhy i used nexJob[0]
  // console.log(myJob[0]);
  useEffect(() => {
    async function getSingleJob() {
      let response;
      try {
        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}job/specific-job/${myJob[0]}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Single Job Response api is ", response);
        setSingleJob(response?.data?.data);
      } catch (error) {
        // console.log("Getting Error while getting the job info ");
        toast.error(error?.response?.data?.message);
      }
    }
    getSingleJob();
  }, [location, token]);

  // console.log("Job info is ", singleJob);
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 mt-16 md:mt-10 lg:mt-2">
      <div className="bg-gradient-to-r from-gray-150 to-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1  w-full max-w-lg mx-4">
        <h3 className="text-center text-2xl text-gray-800 mb-6">Job Details</h3>
        <div className="bg-gradient-to-r from-gray-200 to-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1 ">
          <p className="mb-2">
            Title: <span className="font-bold">{singleJob?.title}</span>
          </p>
          <p className="mb-2">
            Category: <span className="font-bold">{singleJob?.category}</span>
          </p>
          <p className="mb-2">
            Country: <span className="font-bold">{singleJob?.country}</span>
          </p>
          <p className="mb-2">
            City: <span className="font-bold">{singleJob?.city}</span>
          </p>
          <p className="mb-2">
            Location: <span className="font-bold">{singleJob?.location}</span>
          </p>
          <p className="mb-2">
            Description:
            <span className="font-bold">
              {singleJob?.description.length > 100
                ? singleJob?.description.substr(0, 80) + "..."
                : singleJob?.description}
            </span>
          </p>
          <p className="mb-2">
            Job Posted On:
            <span className="font-bold">{singleJob?.jobPostedOn}</span>
          </p>
          <div className=" flex mb-2">
            <span className="text-2xl">Salary :</span>
            {singleJob?.salaryType === "Fixed Salary" ? (
              <p className="flex items-center justify-center ml-4 font-bold">{singleJob?.fixedSalary}</p>
            ) : (
              <div className="flex items-center justify-center gap-3 text-xl">
                <span>
                  <b>{singleJob?.salaryFrom}</b>
                </span>
                <span>
                  To <b>{singleJob?.salaryTo}</b>
                </span>
              </div>
            )}
          </div>
          {/* Only job seekers can apply for the job */}
          {user?.role === "Job Seeker" && (
            <Link
              to={`/apply-job/${singleJob?._id}`}
              className="inline-block mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
            >
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default JobsDetails;
