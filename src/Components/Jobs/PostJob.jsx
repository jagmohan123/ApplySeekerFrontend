import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { createJob } from "../Services/Oprations/Job";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function PostJob() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // console.log("In Job Create Component");
  const categoryArr = [
    "Human Resources (HR)",
    "Information Technology (IT)",
    "Marketing",
    "Sales",
    "Account & Finance",
    "Customer Service",
    "Education and Training",
    "Health and Safety",
    "Product Management",
    "Research and Development (R&D)",
  ];
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    salaryFrom: "",
    salaryTo: "",
    fixedSalary: "",
    salaryType: "fixed",
  });

  function formHandler(event) {
    event.preventDefault();
    setJobData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    salaryFrom,
    salaryTo,
    fixedSalary,
    salaryType,
  } = jobData;
  async function submitJobHandler(event) {
    const toastId = toast.loading("Creating Job");
    event.preventDefault();
    // console.log("Jobdata are", jobData);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}job/post`,
        {
          title,
          description,
          category,
          country,
          city,
          location,
          salaryFrom,
          salaryTo,
          fixedSalary,
          salaryType,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      // console.log("We aew here to call create job service  ");
      toast.success(response?.data?.message);
      toast.dismiss(toastId);
      navigate("/my-all-job");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.error);
      toast.dismiss(toastId);

      // console.log(error);
    }
    toast.dismiss(toastId);
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 max-sm:mt-16 max-md:mt-20 max-lg:mt-24">
      <div className="bg-gradient-to-r from-gray-200 to-white   hover:shadow-xl transition-transform transform hover:-translate-y-1 p-8 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <h3 className="text-center text-2xl text-gray-800 mb-6">
          POST NEW JOB
        </h3>
        <form onSubmit={submitJobHandler} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div>
              <label htmlFor="title" className="block mb-1 font-semibold">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Job Title"
                name="title"
                value={jobData.title}
                onChange={formHandler}
                required
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label htmlFor="category" className="block mb-1 font-semibold">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={jobData.category}
                onChange={formHandler}
                required
                className="p-2 border border-gray-300 rounded w-full"
              >
                {categoryArr.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div>
              <label htmlFor="country" className="block mb-1 font-semibold">
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                placeholder="Country"
                value={jobData.country}
                onChange={formHandler}
                required
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="city" className="block mb-1 font-semibold">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                value={jobData.city}
                onChange={formHandler}
                required
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block mb-1 font-semibold">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              minLength={15}
              required
              placeholder="Location"
              value={jobData.location}
              onChange={formHandler}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="salaryType" className="block mb-1 font-semibold">
                Salary Type
              </label>
              <select
                name="salaryType"
                id="salaryType"
                value={jobData.salaryType}
                onChange={formHandler}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
            </div>
            <div className="flex flex-col gap-4">
              {jobData.salaryType === "Fixed Salary" ? (
                <div>
                  <label
                    htmlFor="fixedSalary"
                    className="block mb-1 font-semibold"
                  >
                    Fixed Salary
                  </label>

                  <input
                    name="fixedSalary"
                    type="number"
                    id="fixedSalary"
                    required
                    minLength={3}
                    placeholder="Enter Fixed Salary"
                    value={jobData.fixedSalary}
                    onChange={formHandler}
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                </div>
              ) : jobData.salaryType === "Ranged Salary" ? (
                <div className="flex flex-col md:flex-row gap-4">
                  <div>
                    <label
                      htmlFor="salaryFrom"
                      className="block mb-1 font-semibold"
                    >
                      Salary From
                    </label>
                    <input
                      type="number"
                      name="salaryFrom"
                      id="salaryFrom"
                      placeholder="Salary From"
                      value={jobData.salaryFrom}
                      onChange={formHandler}
                      required
                      minLength={3}
                      className="p-2 border border-gray-300 rounded w-full"
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
                      type="number"
                      name="salaryTo"
                      id="salaryTo"
                      placeholder="Salary To"
                      value={jobData.salaryTo}
                      onChange={formHandler}
                      required
                      minLength={3}
                      className="p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                </div>
              ) : (
                " "
              )}
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 font-semibold">
              Job Discription
            </label>
            <textarea
              rows="10"
              cols="20"
              name="description"
              id="description"
              placeholder="Job Description"
              value={jobData.description}
              onChange={formHandler}
              required
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
}
