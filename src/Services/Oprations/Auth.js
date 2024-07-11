import toast from "react-hot-toast";
// import UserEndPoints from "../../ApiEndPoints/ALL_API.JS";
import { ApiConncector } from "./ApiConnector";
import {
  setIsAuthorized,
  setSignupData,
  setToken,
  setUser,
} from "../../Slices/authSlice";
export function sendOtp(email, navigate) {
  // console.log("we are send otp service ");
  return async (dispatch) => {
    const toastId = toast.loading("Loding");
    try {
      const response = await ApiConncector(
        "POST",
        `${process.env.REACT_APP_BASE_URL}auth/sendotp`,
        {
          email,
        }
      );
      // console.log("Send OTP API Response is ", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP sent successfully");
      navigate("/verify-email");
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log("Error occured during sending the otp ");
      // console.log("Errorm message is =>", error.message);
      // console.log("Actual error is ==>", error);
      toast.dismiss(toastId);
    }
    toast.dismiss(toastId);
  };
}

export function SignUp(
  firstName,
  lastName,
  email,
  password,
  confirm_password,
  role,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("loading");
    try {
      const response = await ApiConncector(
        "POST",
        `${process.env.REACT_APP_BASE_URL}auth/signup`,
        {
          firstName,
          lastName,
          email,
          password,
          confirm_password,
          role,
          otp,
        }
      );
      // console.log("SIGN UP API RESPONSE IS ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Account Created Successfully");
      navigate("/login");
    } catch (error) {
      // console.log("Error occured while Registering in portel", error);
      // console.log(error.message);
      toast.error("Signup Failed");
      navigate("/signup");
      toast.dismiss(toastId);
    }
    toast.dismiss(toastId);
  };
}

export function LoginUser(email, password, role, navigate) {
  // console.log(`${process.env.REACT_APP_BASE_URL}auth/login`);
  return async (dispatch) => {
    const toastId = toast.loading("loading");
    try {
      const response = await ApiConncector(
        "POST",
        `${process.env.REACT_APP_BASE_URL}auth/login`,
        {
          email,
          password,
          role,
        }
      );
      // console.log("LOGIN API RESPONSE ", response);
      if (!response.data.success) {
        throw new Error(" Error Occured while loging ", response.data.message);
      }
      toast.success("Login successfully");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      // most imp below line
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
      toast.dismiss(toastId);
    } catch (error) {
      // console.log("Error occured while loging ", error);
      // console.log("Error Message is ", error.response);
      toast.error(error.response?.data?.message);
      toast.dismiss(toastId);
    }
    toast.dismiss(toastId);
  };
}

export function LogoutUser(navigate) {
  // console.log("Logout sevices ");
  return (dispatch) => {
    const toastId = toast.loading("loading");
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(setSignupData(null));
    dispatch(setIsAuthorized(false));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/login");
    toast.dismiss(toastId);
  };
}

export function resetPasswordToken(email, setEmailSent) {
  // console.log("Email we get here is ", email);
  return async (dispatch) => {
    try {
      const toastId = toast.loading("email sending ");
      const response = await ApiConncector(
        "POST",
        `${process.env.REACT_APP_BASE_URL}auth/reset-password-token`,
        { email }
      );
      // console.log("Reset Passowd Token Api Response is ", response);
      if (!response) {
        throw new Error("Forgot password Generate token error ");
      }
      toast.success("Email sent Successfully");
      toast.dismiss(toastId);
      setEmailSent(true);
    } catch (error) {
      // console.log(
      //   "Error occured while sending reset Token email to the user",
      //   error
      // );
      toast.error(error?.response?.data?.message);

      toast.error(error.response.data.message);
    }
  };
}
