import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../Services/Oprations/Auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  // console.log("token is present ", token);

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  function LogoutHandler() {
    // event.preventDefault();
    dispatch(LogoutUser(navigate));
  }
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          ApplySeeker
        </Link>
        <button
          className="text-2xl md:hidden focus:outline-none"
          onClick={toggleNavbar}
        >
          <GiHamburgerMenu />
        </button>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto`}
        >
          <div className="lg:flex md:flex-row md:space-x-4">
            <Link
              to="/"
              className="text-white hover:text-gray-400 mt-2 md:mt-0"
            >
              Home
            </Link>
            {token && (
              <Link
                to="all-available-jobs"
                className="text-white hover:text-gray-400 mt-2 md:mt-0"
              >
                All JOBS
              </Link>
            )}
            {token && user?.role === "Job Seeker" && (
              <Link
                to="my-applications"
                className="text-white hover:text-gray-400 mt-2 md:mt-0"
              >
                My Applications
              </Link>
            )}
            {token && user?.role === "Employer" && (
              <>
                <Link
                  to="/my-all-job"
                  className="text-white hover:text-gray-400 mt-2 md:mt-0"
                >
                  View Your JOBS
                </Link>
                <Link
                  to="/post-job"
                  className="text-white hover:text-gray-400 mt-2 md:mt-0"
                >
                  Post New Job
                </Link>
                <Link
                  to="/applicants-applications"
                  className="text-white hover:text-gray-400 mt-2 md:mt-0"
                >
                  Applicant's Applications
                </Link>
              </>
            )}
            {token && (
              <Link
                to="/my-profile"
                className="text-white hover:text-gray-400 mt-2 md:mt-0"
              >
                My Profile
              </Link>
            )}
            {user ? (
              <div onClick={LogoutHandler}>
                <Link
                  to="/"
                  className="text-white hover:text-gray-400 mt-2 md:mt-0"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <Link
                to="login"
                className="text-white hover:text-gray-400 mt-2 md:mt-0"
              >
                LogIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
