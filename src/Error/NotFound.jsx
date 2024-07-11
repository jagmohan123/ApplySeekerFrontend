import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <section className="page notfound flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="content text-center">
          <img
            src="/notfound.png"
            alt="Error Img"
            className="w-full max-w-md mx-auto mb-6 rounded-md"
          />
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
          >
            RETURN TO HOME PAGE
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;
