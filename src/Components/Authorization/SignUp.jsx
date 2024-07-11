import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../Slices/authSlice";
import { sendOtp } from "../../Services/Oprations/Auth";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState(true);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(true);
  const [signupForm, setSignUpFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "",
  });
  function formHandler(event) {
    event.preventDefault();
    setSignUpFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    if (signupForm.password !== signupForm.confirm_password) {
      toast.error("Password and confirm password value not match ");
      return;
    }
    // console.log("SignUP Data=>", signupForm);
    dispatch(setSignupData(signupForm));
    dispatch(sendOtp(signupForm.email, navigate));
  }

  return (
    <div className="form-container1 mb-16">
      <div className="bg-gradient-to-r from-gray-200 to-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform transform hover:-translate-y-1 ">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-center">Signup</h2>
          <form id="signup-form" onSubmit={submitHandler}>
            <div className="form-group1">
              <label htmlFor="role" className="block mb-2 text-gray-600">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={signupForm.role}
                onChange={formHandler}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
            </div>
            <div className="form-group1">
              <label htmlFor="firstName" className="block mb-2 text-gray-600">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={signupForm.firstName}
                onChange={formHandler}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="form-group1">
              <label htmlFor="lastName" className="block mb-2 text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={signupForm.lastName}
                onChange={formHandler}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="form-group1">
              <label htmlFor="email" className="block mb-2 text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={signupForm.email}
                onChange={formHandler}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="form-group1 relative">
              <label htmlFor="password" className="block mb-2 text-gray-600">
                Password
              </label>
              <input
                type={viewPassword ? "password" : "text"}
                id="password"
                name="password"
                value={signupForm.password}
                onChange={formHandler}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              />
              <span
                className="absolute top-[43px] right-3 cursor-pointer bg-blue-500 text-white rounded-full p-2"
                onClick={() => setViewPassword(!viewPassword)}
              >
                {viewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <div className="form-group1 relative">
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type={viewConfirmPassword ? "password" : "text"}
                id="confirm_password"
                name="confirm_password"
                value={signupForm.confirm_password}
                onChange={formHandler}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              />
              <span
                className="absolute top-[43px] right-3 cursor-pointer bg-blue-500 text-white rounded-full p-2"
                onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
              >
                {viewConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </div>
            <div className="form-group1">
              <Link to="/login" className="text-blue-500 block mb-2">
                Already have an account?{" "}
                <span className="font-semibold">Login</span>
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
