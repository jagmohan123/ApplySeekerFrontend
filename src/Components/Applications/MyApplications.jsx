import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { setApplication } from "../../Slices/applicationSlice";
export default function MyApplications() {
  const { token } = useSelector((state) => state.auth);
  const [myApplication, setMyApplication] = useState([]);
  const dispatch = useDispatch();
  function openResume(url) {
    window.open(url, "_blank");
  }

  async function getMyApplication() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}application/all-applied-applications`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Get My application api response is ", response);
      dispatch(setApplication(response?.data?.data));
      setMyApplication(response?.data?.data);

      toast.success(response?.data?.message);
    } catch (error) {
      // console.log("Getting error which fetching the applied application data ");
      // console.log(error, error.message);
      toast.error(error.response.data.message);
    }
  }
  const location = useLocation();
  useEffect(() => {
    getMyApplication();
  }, [location, token]);
  // console.log("IN Array ", myApplication);

  async function deleteJob(id) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}application/delete-application/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(
      //   "We got response when we are applying for the job ",
      //   response
      // );

      toast.success(response?.data?.message);
      setMyApplication(myApplication.filter((myapp) => myapp?._id !== id));
    } catch (error) {
      // console.log("We are getting error while deleting the job ", error);
      toast.error(error.response?.data?.message);
    }
  }

  return (
    <div className="mt-16 md:mt-20 lg:mt-24 bg-gray-100">
      <div className="text-center">
        <h2 className=" text-2xl font-bold">My Applied Jobs Application</h2>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12 mt-8">
        {myApplication?.length === 0 || myApplication?.length === undefined ? (
          <div className="flex items-center justify-center h-[50%] mt-2 mb-10">
            <div className="bg-gradient-to-r from-gray-200 to-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform transform hover:-translate-y-1">
              <p className="text-gray-600 text-2xl font-black">
                You are not applied to any Job yet !!!
              </p>
            </div>
          </div>
        ) : (
          myApplication?.map((item, index) => {
            return (
              <div
                className="bg-gradient-to-r from-gray-200 to-white  p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1 border border-gray-300 rounded-lg shadow-md overflow-hidden flex-shrink-0 w-full md:w-[45%] lg:w-[30%] mb-8"
                key={index}
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">
                    Name: {`${item?.firstName} ${item?.lastName}`}
                  </h2>
                  <p>
                    <strong>Email:</strong> {item?.email}
                  </p>
                  <p>
                    <strong>Contact:</strong> {item?.contact}
                  </p>
                  <p className="mt-4">
                    <strong>Cover Letter:</strong>{" "}
                    <span className="text-gray-700">
                      {item?.coverLetter.length > 40
                        ? `${item.coverLetter.substr(0, 100)}...`
                        : item.coverLetter}
                    </span>
                  </p>
                  <div className="flex items-center mt-4">
                    <span className="font-semibold mr-2">Resume:</span>
                    <div
                      className="cursor-pointer"
                      onClick={() => openResume(item?.resume?.url)}
                    >
                      <img
                        src={`${item?.resume?.url}`}
                        alt="resume"
                        className="w-16 h-auto rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-b-lg w-full hover:bg-red-600 transition duration-300"
                  onClick={() => deleteJob(item?._id)}
                >
                  Delete
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
