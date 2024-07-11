import React, { useState } from "react";
// import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../Services/Oprations/Auth";

const Login = () => {
  const [viewPassword, setViewPassword] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  function formHandler(event) {
    setLoginFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  function LoginHandler(event) {
    event.preventDefault();
    // console.log("Form Data is ", loginFormData);
    const { email, password, role } = loginFormData;
    dispatch(LoginUser(email, password, role, navigate));
  }
  return (
    <div className="bg-gradient-to-r from-gray-200 to-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform transform hover:-translate-y-1 ">
      <div className="max-w-lg mx-auto">
        <h2 className="text-3xl font-semibold mb-5 text-center">Login</h2>
        <form id="login-form" onSubmit={LoginHandler}>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2 text-gray-600">
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={loginFormData.role}
              onChange={formHandler}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Role</option>
              <option value="Employer">Employer</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="login-email" className="block mb-2 text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={loginFormData.email}
              onChange={formHandler}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="login-password"
              className="block mb-2 text-gray-600"
            >
              Password
            </label>
            <input
              type={viewPassword ? "password" : "text"}
              id="login-password"
              name="password"
              value={loginFormData.password}
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
          <div className="mb-4">
            <Link to="/signup" className="text-blue-500 block mb-2">
              Are you new? <span className="font-semibold">Register Here</span>
            </Link>
            <Link to="/reset-password" className="text-blue-500 block mb-2">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600 transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
