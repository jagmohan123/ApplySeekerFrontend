import React from "react";
import ChangeProfileImage from "./ChangeProfileImage";
import EditProfileData from "./EditProfileData";

function EditProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-400 py-8 px-4 sm:px-6 lg:px-8 max-sm:mt-28 max-md:mt-28">
    <div className="mx-auto">
      <h1 className=" text-3xl font-medium text-richblack-700 mt-2 text-center">
        Edit Profile
      </h1>
      <div className="mb-8">
        <ChangeProfileImage />
      </div>
      <div className="mb-8">
        <EditProfileData />
      </div>
    </div>
  </div>
  
  );
}

export default EditProfile;
