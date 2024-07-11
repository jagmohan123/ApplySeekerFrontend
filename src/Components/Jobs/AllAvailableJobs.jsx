import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setAllJob } from "../../Slices/jobSlice";
import toast from "react-hot-toast";
export default function AllAvailableJobs() {
  // console.log("I am all available jobs component ");
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let response;
    async function getAllAvailableJob() {
      try {
        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}job/all-job`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("ALL JOB API RESPONSE IS ", response);
        dispatch(setAllJob(response?.data));
        toast.success(response?.data?.message);
      } catch (error) {
        // console.log("Getting error ", error);
        toast.error(error.response?.data?.message);
      }
    }
    getAllAvailableJob();
  }, [location, token, dispatch]);

  const { allJob } = useSelector((state) => state.job);
  // console.log("IN All Jobs", allJob);
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 max-sm:mt-10 ">
      <div className="p-8 rounded-lg w-full max-w-[1200px] mx-4">
        <h1 className="text-center text-3xl text-gray-800 mb-6">
          ALL AVAILABLE JOBS
        </h1>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {allJob.length <= 0 ? (
            <div className="text-center text-xl font-bold text-gray-900 mb-6">
              No Jobs Available
            </div>
          ) : (
            allJob.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-200 to-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1  w-full md:w-1/2 lg:w-1/2 xl:w-1/3"
              >
                <p className="mb-2">{item.title}</p>
                <p className="mb-2">{item.category}</p>
                <p className="mb-2">{item.country}</p>
                <Link
                  to={`/jobs-info/${item._id}`}
                  className="inline-block mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                >
                  Job Details
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
