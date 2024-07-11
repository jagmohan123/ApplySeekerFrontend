import "./App.css";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Header_Footer/Navbar";
import { Route, Routes } from "react-router-dom";
import VerifyEmail from "./Components/VerifyEmail";
import Login from "./Components/Authorization/Login";
import SignUp from "./Components/Authorization/SignUp";
// ;
import ForgotPassword from "./Components/ForgotPassword";
import PostJob from "./Components/Jobs/PostJob";
import MyPostedJob from "./Components/Jobs/MyPostedJob";
import AllAvailableJobs from "./Components/Jobs/AllAvailableJobs";
import JobsDetails from "./Components/Jobs/JobsDetails";
import SendApplication from "./Components/Applications/SendApplication";
import MyApplications from "./Components/Applications/MyApplications";
import NotFound from "./Error/NotFound";
import ChangePasswordPage from "./Components/ChangePasswordPage";
import EditMMyJob from "./Components/Jobs/EditMMyJob";
import Profile from "./Components/Profile/Profile";
import ApplicantApplications from "./Components/Applications/ApplicantApplications";
import EditProfile from "./Components/Profile/EditProfile";
import FooterCap from "./Components/Header_Footer/FooterCap";
import OpenRoute from "./Components/AccessPage/OpenRoute";
import PrivateRoute from "./Components/AccessPage/PrivateRoute";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element=<Home /> />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />

        <Route
          path="reset-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="change-password/:token"
          element={
            <OpenRoute>
              <ChangePasswordPage />
            </OpenRoute>
          }
        />
        <Route
          path="/post-job"
          element={
            <PrivateRoute>
              <PostJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-all-job"
          element={
            <PrivateRoute>
              <MyPostedJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs-info/:id"
          element={
            <PrivateRoute>
              <JobsDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-available-jobs"
          element={
            <PrivateRoute>
              <AllAvailableJobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-job/:id"
          element={
            <PrivateRoute>
              <EditMMyJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/apply-job/:id"
          element={
            <PrivateRoute>
              <SendApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <PrivateRoute>
              <MyApplications />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/applicants-applications"
          element={
            <PrivateRoute>
              <ApplicantApplications />
            </PrivateRoute>
          }
        />
        <Route path="*" element=<NotFound /> />
      </Routes>
      <FooterCap />
    </div>
  );
}

export default App;
