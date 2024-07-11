import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiEditBoxLine } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";
import {
  setToken,
  setSignupData,
  setIsAuthorized,
  setUser,
} from "../../Slices/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./Profile.css";
import toast from "react-hot-toast";
function Profile() {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  async function getUser() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}auth/get-user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUser(response?.data?.data));
      // console.log("response is ", response);
    } catch (error) {
      // console.log("getting error", error.message);
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    getUser();
  }, [token, location]);

  // delet user Account
  async function deleteHandler() {
    const toastId = toast.loading("deleting ");
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}profile/delete-account`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // after deleting the user account we have to remove the token data and user from the localstorage
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(setSignupData(null));
      dispatch(setIsAuthorized(false));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("response is ", response);
      toast.dismiss(toastId);
      toast.success(response?.data?.message);

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      toast.dismiss(toastId);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-5 py-10 max-sm:mt-10">
      <div className="flex flex-col items-center gap-6  border border-gray-300 bg-gradient-to-r from-gray-200 to-white shadow-lg rounded-lg  hover:shadow-xl transition-transform transform hover:-translate-y-1 p-6 w-full max-w-2xl  mx-4">
        {/* Profile Header */}
        <div className="flex flex-col items-center md:flex-row md:items-center gap-x-4 text-center md:text-left mb-6">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-24 rounded-full object-cover"
          />
          <div className="mt-4 md:mt-0">
            <p className="text-2xl font-semibold text-gray-900">
              {`${user?.firstName} ${user?.lastName}`}
            </p>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* User Details Section */}
        <div className="w-full flex flex-col md:flex-row gap-10">
          <div className="flex flex-col gap-y-4 w-full md:w-1/2">
            <div>
              <p className="mb-1 text-sm text-gray-500">First Name</p>
              <p className="text-base font-medium text-gray-800">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-500">Email</p>
              <p className="text-base font-medium text-gray-800">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-500">Gender</p>
              <p className="text-base font-medium text-gray-800">
                {user?.additionalDetails?.gender}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-500">About</p>
              <p className="text-base font-medium text-gray-800">
                {user?.additionalDetails?.about}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 w-full md:w-1/2">
            <div>
              <p className="mb-1 text-sm text-gray-500">Last Name</p>
              <p className="text-base font-medium text-gray-800">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-500">Phone Number</p>
              <p className="text-base font-medium text-gray-800">
                {user?.additionalDetails?.contact}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-500">Date Of Birth</p>
              <p className="text-base font-medium text-gray-800">
                {user?.additionalDetails?.dateOfBirth}
              </p>
            </div>

            {/* Account Type Section */}
            <div>
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="text-base font-medium text-gray-800">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
        <div className=" flex gap-3 items-center justify-center">
          {/* Edit Button */}
          <div className="mt-10">
            <Link to="/edit-profile">
              <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                <span className="mr-2">Edit Profile</span>
                <RiEditBoxLine />
              </button>
            </Link>
          </div>
          <div className="mt-10">
            <button
              onClick={deleteHandler}
              className="flex items-center bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
            >
              <span className="mr-2">Delete Profile</span>
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
