import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Link } from "react-router-dom";
const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How ApplySeeker Works</h3>
          <div className="banner">
            <div className="card">
              <Link to="/login" className="cursor-pointer">
                <FaUserPlus className="mx-auto" />
                <p>Create Account</p>
                <p>
                  Welcome to Apply Seeker, where your dream job meets the
                  perfect candidate. Whether you're an employer looking for top
                  talent or a job seeker aiming to advance your career, you're
                  just a few steps away from unlocking endless opportunities.
                </p>
              </Link>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                <span className="text-white text-xl">Post Job -:</span> we make
                it easy for employers to find the perfect candidates. Whether
                you're a startup looking for fresh talent or an established
                company seeking experienced professionals, our platform offers
                the tools you need to manage your hiring process efficiently.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                where your next career opportunity awaits. Whether you're just
                starting out or looking to take the next step in your
                professional journey, our platform is designed to connect you
                with employers who value your skills and experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
