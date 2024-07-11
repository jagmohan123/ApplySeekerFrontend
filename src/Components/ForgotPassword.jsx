import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./ForgotPassword.css";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPasswordToken } from "../Services/Oprations/Auth";
function ForgotPassword() {
  const [isEmailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  function goToLogin(event) {
    event.preventDefault();

    naviagate("/login");
  }

  function sumbitHandler(event) {
    event.preventDefault();
    if (email === "") {
      toast.error("Please enter email id");
      return;
    }

    dispatch(resetPasswordToken(email, setEmailSent));
    setLoading(false);
  }

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {loading ? (
        <div className="flex items-center justify-center mt-36">Loading</div>
      ) : (
        <div className="w-full max-w-md bg-gradient-to-r from-gray-200 to-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform transform hover:-translate-y-1  flex flex-col items-center justify-center">
          <div className="text-center w-full">
            <h1 className="text-2xl md:text-4xl text-gray-800 font-semibold">
              {!isEmailSent ? "Reset Your Password" : "Check Your Email"}
            </h1>
            <p className="mt-4 text-gray-600 text-sm md:text-lg leading-6">
              {!isEmailSent
                ? "Have no fear. We’ll email you instructions to reset your password. If you don't have access to your email we can try account recovery."
                : `We have sent the reset email to ${email}`}
            </p>
          </div>

          <div className="flex flex-col w-full mt-4 items-center justify-center">
            <form onSubmit={sumbitHandler} className="w-full">
              {!isEmailSent && (
                <div className="w-full mt-8">
                  <label className="w-full">
                    <p className="text-sm md:text-base text-gray-800 mb-1 leading-tight">
                      Email address <sup className="text-pink-500">*</sup>
                    </p>
                    <input
                      required
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Enter email"
                      className="w-full bg-gray-200 rounded-lg px-4 py-2"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
              )}

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full text-sm md:text-base px-6 py-3 rounded-lg font-bold shadow-md bg-blue-600 text-white hover:scale-95 transition-all duration-200"
                >
                  {!isEmailSent ? "Send Reset Password Link" : "Resend email"}
                </button>
              </div>

              <div className="mt-4 text-gray-800 flex items-center justify-center gap-3">
                <FaArrowLeftLong />
                <button
                  type="button"
                  onClick={goToLogin}
                  className="underline hover:text-blue-500 transition duration-300"
                >
                  Back to login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
