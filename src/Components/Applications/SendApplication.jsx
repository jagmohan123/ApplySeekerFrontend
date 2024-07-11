import React, { useState } from "react";
// import "./SendApplication.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function SendApplication() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  let jobId = useParams();
  // jobId=Object.values();
  // jobId=jobId[0];
  // console.log("We are in apply job controller ");
  let extractJobId = Object.values(jobId);
  // console.log(extractJobId[0]);
  const id = extractJobId[0];
  const [resumefile, setResumeFile] = useState(null);
  const [applicationFormData, setApplicationFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
    coverLetter: "",
  });

  const extractResume = (event) => {
    // console.log("files in the formate ", event.target.files[0].name);
    let ex = event.target.files[0];
    const resume = ex;
    setResumeFile(resume);
    // console.log("resume me data yha ", resumefile);
  };

  function submitApplyHandler(event) {
    event.preventDefault();
    ApplyJob();
  }

  const { firstName, lastName, email, contact, address, coverLetter } =
    applicationFormData;
  function formHandler(event) {
    setApplicationFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  // when we upload some thing by formdata you must set the content type multipart/form-data other wise it always
  // read values undefined

  async function ApplyJob() {
    // console.log("resume me data", resumefile);
    const toatsId = toast.loading("sending ");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}application/apply-job/${id}`,
        {
          firstName,
          lastName,
          email,
          contact,
          address,
          coverLetter,
          resumefile,
        },
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
      navigate("/my-applications");
      toast.dismiss(toatsId);
    } catch (error) {
      // console.log("We are getting error while applying for the job ", error);
      toast.error(error.response?.data?.message);
      toast.dismiss(toatsId);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-4 my-8   bg-gradient-to-r from-gray-150 to-white hover:shadow-xl transition-transform transform hover:-translate-y-1 ">
        <div className="bg-gradient-to-r from-gray-200 to-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1 ">
          <h3 className="text-center text-2xl text-gray-800 mb-6">
            Application Form
          </h3>
          <form onSubmit={submitApplyHandler} className="flex flex-col gap-4">
            <input
              type="text"
              name="firstName"
              value={applicationFormData.firstName}
              onChange={formHandler}
              placeholder="Your First Name"
              required
              className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="lastName"
              value={applicationFormData.lastName}
              onChange={formHandler}
              placeholder="Your Last Name"
              required
              className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={applicationFormData.email}
              onChange={formHandler}
              placeholder="Your Email Address"
              required
              className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <input
              type="number"
              name="contact"
              value={applicationFormData.contact}
              onChange={formHandler}
              placeholder="Your Phone Number"
              required
              className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="address"
              value={applicationFormData.address}
              onChange={formHandler}
              placeholder="Your Address"
              required
              className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <textarea
              name="coverLetter"
              placeholder="Cover Letter..."
              value={applicationFormData.coverLetter}
              onChange={formHandler}
              rows="5"
              required
              className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
            ></textarea>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-600">
                Select Resume
              </label>
              <input
                type="file"
                name="resumefile"
                onChange={extractResume}
                accept=".pdf, .jpg, .png"
                className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              Send Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
