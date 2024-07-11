import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
function EditMMyJob() {
  const [jobInfo, setJobInfo] = useState(null);
  const [salaryTy, setSalaryTy] = useState(" ");

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let jobId = useParams();
  jobId = jobId.id;
  // console.log("job kee id hai ", jobId);

  async function getJob(jobId) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}job/specific-job/${jobId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobInfo(response?.data?.data);
    } catch (error) {}
  }

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

  useEffect(() => {
    getJob(jobId);
  }, []);

  async function handleSumitFormData(data) {
    // console.log("edit form me data ", data);
    const toastId = toast.loading("updating ");
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}job/update-job/${jobId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("updated job data response is ", response);
      navigate("/my-all-job");
      toast.dismiss(toastId);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      toast.dismiss(toastId);
    }
    toast.dismiss(toastId);
  }

  function storeSalaryType(event) {
    setSalaryTy(event.target.value);
  }
  // console.log("mode is ", salaryTy);

  // console.log("job info me data", jobInfo?.data);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 max-sm:mt-16 max-md:mt-10 max-lg:mt-18">
      <div className="bg-gradient-to-r from-gray-200 to-white   hover:shadow-xl transition-transform transform hover:-translate-y-1 p-8 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <form className="w-full" onSubmit={handleSubmit(handleSumitFormData)}>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4">Edit Job Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="title" className="block mb-1">
                  Job title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter the Job Title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("title", { required: true })}
                  defaultValue={jobInfo?.title}
                />
                {errors.title && (
                  <span className="-mt-1 text-[12px] text-pink-600">
                    Please enter the Job Title
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="country" className="block mb-1">
                  Country Name
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Enter Country name "
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("country", { required: true })}
                  defaultValue={jobInfo?.country}
                />
                {errors.country && (
                  <span className="-mt-1 text-[12px] text-pink-600">
                    Please enter the Country Name
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block mb-1">
                City Name
              </label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Enter the city name "
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                {...register("city", { required: true })}
                defaultValue={jobInfo?.city}
              />
              {errors.city && (
                <span className="-mt-1 text-[12px] text-pink-600">
                  Please enter the City Name
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="category" className="block mb-1">
                  Category
                </label>
                <select
                  type="text"
                  name="category"
                  id="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("category", { required: true })}
                  defaultValue={jobInfo?.category}
                >
                  {categoryArr.map((ele, i) => (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="-mt-1 text-[12px] text-pink-600">
                    Please select the category.
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="expired" className="block mb-1">
                  Expired
                </label>
                <select
                  type="text"
                  name="expired"
                  id="expired"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("expired", { required: true })}
                  defaultValue={jobInfo?.expired}
                >
                  <option>false</option>
                  <option>true</option>
                </select>
                {errors.expired && (
                  <span className="-mt-1 text-[12px] text-pink-600">
                    Choose the options
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="salaryType"
                  className="block mb-1 font-semibold"
                >
                  Salary Type
                </label>
                <select
                  name="salaryType"
                  id="salaryType"
                  className="p-2 border border-gray-300 rounded w-full"
                  {...register("salaryType", { required: true })}
                  defaultValue={jobInfo?.salaryType}
                  onChange={storeSalaryType}
                >
                  <option value="Fixed Salary">Fixed Salary</option>
                  <option value="Ranged Salary">Ranged Salary</option>
                </select>
                {errors.salaryType && (
                  <span className="-mt-1 text-[12px] text-pink-600">
                    Choose the salary Type from below option
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-4">
                {salaryTy === "Fixed Salary" ? (
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
                      placeholder="Enter Fixed Salary"
                      className="p-2 border border-gray-300 rounded w-full"
                      {...register("fixedSalary", { required: true })}
                      defaultValue={jobInfo?.fixedSalary}
                    />
                    {errors.fixedSalary && (
                      <span className="-mt-1 text-[12px] text-pink-600">
                        Please enter the fixed Salary
                      </span>
                    )}
                  </div>
                ) : salaryTy === "Ranged Salary" ? (
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
                        placeholder="Enter Salary From"
                        className="p-2 border border-gray-300 rounded w-full"
                        {...register("salaryFrom", { required: true })}
                        defaultValue={jobInfo?.salaryFrom}
                      />
                      {errors.salaryFrom && (
                        <span className="-mt-1 text-[12px] text-pink-600">
                          Please enter the Salary From
                        </span>
                      )}
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
                        placeholder="Enter Salary To"
                        className="p-2 border border-gray-300 rounded w-full"
                        {...register("salaryTo", { required: true })}
                        defaultValue={jobInfo?.salaryTo}
                      />
                      {errors.salaryTo && (
                        <span className="-mt-1 text-[12px] text-pink-600">
                          Please enter the Salary To
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  " "
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-1">
                Job Discription
              </label>
              <textarea
                type="text"
                rows="10"
                cols="20"
                name="description"
                id="description"
                placeholder="Enter Job Description"
                className="p-2 border border-gray-300 rounded w-full"
                {...register("description", {
                  required: {
                    value: true,
                    message:
                      "Job description should contain atleast 30 character.",
                  },
                  maxLength: {
                    value: 500,
                    message:
                      "Job description can be lie b/w 30 to 500 character",
                  },
                  minLength: {
                    value: 30,
                    message:
                      "Job description can be lie b/w 30 to 500 character",
                  },
                })}
                defaultValue={jobInfo?.description}
              />
              {errors.description && (
                <span className="-mt-1 text-[12px] text-pink-600">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="location" className="block mb-1">
                Job Location
              </label>
              <textarea
                type="text"
                name="location"
                id="location"
                rows="3"
                cols="20"
                placeholder="Enter Job Location"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                {...register("location", {
                  required: {
                    value: true,
                    message:
                      "Job location should contain atleast 15 character.",
                  },
                  maxLength: {
                    value: 100,
                    message: "Job Location can be lie b/w 15 to 100 character",
                  },
                  minLength: {
                    value: 15,
                    message: "Job Location can be lie b/w 15 to 100 character",
                  },
                })}
                defaultValue={jobInfo?.location}
              />
              {errors.location && (
                <span className="-mt-1 text-[12px] text-pink-600">
                  {errors.location.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={() => navigate("/my-all-job")}
              className="px-4 py-2 bg-gray-500 text-white rounded-md font-semibold hover:bg-gray-600 transition duration-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMMyJob;
