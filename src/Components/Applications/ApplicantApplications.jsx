import React, { useEffect, useState } from "react";
import "./ApplicantApplications.css";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
function ApplicantApplications() {
  const { token } = useSelector((state) => state.auth);
  const [applicantApp, setApplicantApp] = useState([]);
  function openResume(url) {
    window.open(url, "_blank");
  }
  useEffect(() => {
    async function getApplicantApplication() {
      
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}application/all-jobs-applications`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response?.data?.message);
        // console.log("API Response who is apply for this job", response);
        setApplicantApp(response?.data?.data);
      } catch (error) {
        // console.log("Got error while getting the job seeker appications ");
        // console.log(error, error.message);
        toast.error(error.response.data.message);
      }
    }

    getApplicantApplication();
  }, []);

  // console.log("Applicant applications", applicantApp);
  return (
    <div className=" bg-gray-100 max-sm:mt-14 max-md:mt-12 max-lg:mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        Applicant's Applications
      </h2>

      <div className="flex gap-3 flex-wrap items-center justify-center">
        {applicantApp.length === 0 ? (
          <div className="flex items-center justify-center h-[50%] mt-8 mb-10">
            <div className="bg-gradient-to-r from-gray-200 to-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform transform hover:-translate-y-1">
              <p className="text-gray-600 text-2xl font-black">
                There are no applicant's applications found!
              </p>
            </div>
          </div>
        ) : (
          applicantApp?.map((item, index) => {
            return (
              <div key={index} className="containerMy">
                <div className="cardMy bg-gradient-to-r from-gray-200 to-white shadow-lg rounded-lg">
                  <div className="cardMy-content">
                    <div className="cardMy-item">
                      First Name: <span>{item.firstName}</span>
                    </div>
                    <div className="cardMy-item">
                      Last Name: <span>{item.lastName}</span>
                    </div>
                    <div className="cardMy-item">
                      Email: <span>{item.email}</span>
                    </div>
                    <div className="cardMy-item">
                      Address: <span>{item.address}</span>
                    </div>
                    <div className="cardMy-item">
                      Contact: <span>{item.contact}</span>
                    </div>
                    <div className="cardMy-item">
                      Cover Letter:{" "}
                      <span>
                        {item?.coverLetter.length > 40
                          ? `${item.coverLetter.substr(0, 100)}...`
                          : item.coverLetter}
                      </span>
                    </div>
                    <div className="cardMy-item text-black font-semibold">
                      Resume:{" "}
                      <img
                        src={`${item?.resume?.url}`}
                        alt="Resume Thumbnail"
                        className="resume-thumbnail cursor-pointer"
                        onClick={() => openResume(item?.resume?.url)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ApplicantApplications;
