import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function FooterCap() {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-yellow-50">Contact Information</h2>
          <p className="text-gray-400 mb-2">123 Main Street</p>
          <p className="text-gray-400 mb-2">City, State, 12345</p>
          <p className="text-gray-400 mb-2">Email: info@applyseeker.com</p>
          <p className="text-gray-400 mb-2">Phone: (123) 456-7890</p>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-4  text-yellow-50">Follow Us</h2>
          <div className="flex space-x-4">
            <Link
              to={"https://www.facebook.com/jagmohanrai082"}
              target="_blank"
              className="text-gray-400 hover:text-gray-200"
            >
              <FaFacebook size={24} />
            </Link>
            <Link
              to={"https://github.com/jagmohan123"}
              target="_blank"
              className="text-gray-400 hover:text-gray-200"
            >
              <FaGithub size={24} />
            </Link>
            <Link
              to={
                "https://www.instagram.com/rai_mohit321?igsh=azl6aHRtZjZmZHRo"
              }
              target="_blank"
              className="text-gray-400 hover:text-gray-200"
            >
              <FaInstagram size={24} />
            </Link>
            <Link
              to={"https://www.linkedin.com/in/jagmohan-rai1"}
              target="_blank"
              className="text-gray-400 hover:text-gray-200"
            >
              <FaLinkedin size={24} />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400">
        &copy; {new Date().getFullYear()} ApplySeeker. All rights reserved.
      </div>
    </footer>
  );
}
