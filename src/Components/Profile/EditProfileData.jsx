import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Slices/authSlice";

function EditProfileData() {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const genders = [
    "Male",
    "Female",
    "Transgender",
    "Prefer not to say",
    "Other",
  ];

  async function handleSumitFormData(formData) {
    const toastId = toast.loading("updating profile");
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}profile/update-profile-info`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Update Profile data api response is ", response);
      toast.success(response?.data?.message);
      toast.dismiss(toastId);
      dispatch(setUser(response?.data?.data));
      navigate("/my-profile");
    } catch (error) {
      // console.log("getting error while updating the profile info", error);
      toast.error(error?.response?.message);
      toast.dismiss(toastId);
    }
    toast.dismiss(toastId);
  }

  return (
    <div className="bg-gradient-to-r from-gray-200 to-white shadow-lg rounded-lg  hover:shadow-xl transition-transform transform hover:-translate-y-1 border-2 border-gray-700 p-8 px-12 text-gray-500 mt-8 md:mt-0 sm:mt-10">
      <form className="w-full" onSubmit={handleSubmit(handleSumitFormData)}>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Edit Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <p htmlFor="firstName" className="block mb-1">
                First Name
              </p>
              <p className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-blue-500 focus:outline-none">
                {user?.firstName}
              </p>
            </div>
            <div className="mb-4">
              <p htmlFor="firstName" className="block mb-1">
                Last Name
              </p>
              <p className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-blue-500 focus:outline-none">
                {user?.lastName}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              value={user?.email}
              name="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              readOnly
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    // /** Returns a date as a string value in ISO format. */
                    //  toISOString(): string;
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-pink-600">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block mb-1">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-pink-600">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="contact" className="block mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                name="contact"
                id="contact"
                placeholder="Enter Contact Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                {...register("contact", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contact}
              />
              {errors.contact && (
                <span className="-mt-1 text-[12px] text-pink-600">
                  {errors.contact.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="about" className="block mb-1">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter About Your Profession"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-pink-600">
                  Please enter your Profession.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => navigate("/my-profile")}
            className="px-4 py-2 bg-gray-500 text-white rounded-md font-semibold hover:bg-gray-600 transition duration-300"
          >
            Cancel
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
  );
}

export default EditProfileData;
