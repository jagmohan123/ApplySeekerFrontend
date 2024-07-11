import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { setJob } from "../../Slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
let response;
function MyPostedJob() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [myAllPostedJobs, setMyAllPostedJobs] = useState([]);
  const { token } = useSelector((state) => state.auth);
  // console.log("My Posted Job Component ");
  useEffect(() => {
    async function submitJobHandler(event) {
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}job/my-all-job`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("API REsponse");
      dispatch(setJob(response?.data));
      setMyAllPostedJobs(response?.data?.data);
    }
    submitJobHandler();
  }, [location, token, dispatch]);

  // console.log("MFSDFBSHDVF981293463458", myAllPostedJobs);
  async function deleteJobHandler(jobId) {
    let response;
    try {
      response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}job/deleted-job/${jobId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Deleted API Response is ", response);
      toast.success(response?.data?.message);
      setMyAllPostedJobs(myAllPostedJobs?.filter((job) => job?._id !== jobId));
      // console.log("Got deleted ");
    } catch (error) {
      // console.log("Getting Error while deleting the job ");
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 max-md:mt-14 max-sm:mt-14 max-lg:mt-16">
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-max overflow-auto mb-6">
        <h1 className="text-2xl text-center text-gray-800 mb-4">
          My Posted Jobs
        </h1>
        {myAllPostedJobs.length <= 0 || myAllPostedJobs.length === undefined ? (
          <p className="text-center text-gray-600">
            You've not posted any job or may be you deleted all of your jobs!
          </p>
        ) : (
          myAllPostedJobs?.map((job, index) => (
            <div className="mb-2" key={index}>
              <div className="bg-gradient-to-r from-gray-200 to-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform transform hover:-translate-y-1">
                <div className="flex flex-wrap gap-4">
                  <div className="w-full md:w-1/2">
                    <span className="font-bold text-gray-700">Title:</span>
                    <input
                      defaultValue={job?.title}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <span className="font-bold text-gray-700">Country:</span>
                    <input
                      defaultValue={job?.country}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded "
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <span className="font-bold text-gray-700">City:</span>
                    <input
                      value={job?.city}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded "
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <span className="font-bold text-gray-700">Category:</span>
                    <select className="w-full p-1 border border-gray-300 rounded">
                      <option readOnly defaultValue={job?.category}>
                        {job?.category}
                      </option>
                    </select>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div>
                      <span className="font-bold text-gray-700 mx-auto">
                        Salary Type: {job?.salaryType}
                      </span>
                    </div>
                    {job?.salaryType === "Ranged Salary" ? (
                      <div className="flex flex-col md:flex-row gap-4">
                        <div>
                          <label
                            htmlFor="salaryFrom"
                            className="block mb-1 font-semibold"
                          >
                            Salary From
                          </label>
                          <input
                            name="salaryFrom"
                            id="salaryFrom"
                            defaultValue={job?.salaryFrom}
                            readOnly
                            className="p-1 border border-gray-300 rounded w-full"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="salaryTo"
                            className="block mb-1 font-semibold"
                          >
                            Salary To
                          </label>
                          <input
                            name="salaryTo"
                            id="salaryTo"
                            defaultValue={job?.salaryTo}
                            readOnly
                            className="p-1 border border-gray-300 rounded w-full"
                          />
                        </div>
                      </div>
                    ) : job?.salaryType === "Fixed Salary" ? (
                      <div>
                        <label
                          htmlFor="fixedSalary"
                          className="block mb-1 font-semibold"
                        >
                          Fixed Salary
                        </label>
                        <input
                          name="fixedSalary"
                          id="fixedSalary"
                          placeholder="Enter Fixed Salary"
                          defaultValue={job?.fixedSalary}
                          readOnly
                          className="p-1 border border-gray-300 rounded w-full"
                        />
                      </div>
                    ) : (
                      <p>" "</p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2">
                    <span className="font-bold text-gray-700">Is Expired:</span>
                    <input
                      defaultValue={job?.expired}
                      readOnly
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="mt-1">
                  <span className="font-bold text-gray-700">Description:</span>
                  <textarea
                    rows="3"
                    defaultValue={job?.description}
                    readOnly
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </div>
                <div className="mt-1">
                  <span className="font-bold text-gray-700">Location:</span>
                  <textarea
                    rows="3"
                    defaultValue={job?.location}
                    readOnly
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <Link to={`/update-job/${job?._id}`}>
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center gap-1 hover:bg-blue-600">
                      <span>Edit</span>
                      <FiEdit2 size={20} />
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded flex items-center gap-1 hover:bg-red-600"
                    onClick={() => deleteJobHandler(job?._id)}
                  >
                    <span>Delete</span>
                    <MdDelete size={25} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyPostedJob;
