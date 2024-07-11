import React, { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function ChangeProfileImage() {
  const { user, token } = useSelector((state) => state.auth);
  // for storing the image and upload
  const [profileImage, setImage] = useState(null);
  // when our image is upload in server that time we have to show the loading icon to the user
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const nevigate = useNavigate();

  /*The useRef Hook allows you to persist values between renders.
  It can be used to store a mutable value that does not cause a re-render when updated.
  It can be used to access a DOM element directly.
  */

  const fileInputRef = useRef(null);
  function handleClick() {
    fileInputRef.current.click();
    // console.log("click hai ", fileInputRef);
  }

  const handleDisplayImage = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      previewFile(file);
      // console.log("file and preview File has ", image, previewImage);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  async function displayImageUploader(event) {
    event.preventDefault();
    const toastId=toast.loading("uploading Image")
    try {
      setLoading(true);
      let formData = new FormData();

      // displayImage same name hai jo backend se postman se image upload me key ka name hai
      // when we upload some thing by formdata you must set the content type multipart/form-data other wise it always
      // read values undefined
      formData.append("profileImage", profileImage);
      // console.log("image value is ", profileImage);
      // console.log(formData);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}profile/update-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("display image api response is ", response);
      toast.success(response?.data?.message);
      toast.dismiss(toastId)
      nevigate("/my-profile");
      setLoading(false);
    } catch (error) {
      // console.log("getting error while uploading an image ", error);
      setLoading(false);
      toast.error(error.response?.data?.message);
      toast.dismiss(toastId);
    }
    toast.dismiss(toastId)
  }

  // previewFile function always call the  the image if we change the image
  useEffect(() => {
    if (profileImage) {
      previewFile(profileImage);
    }
  }, [profileImage]);

  return (
    <div className="flex items-center justify-between border border-gray-400 bg-gradient-to-r from-gray-200 to-white shadow-lg rounded-lg  hover:shadow-xl transition-transform transform hover:-translate-y-1 bg-gray-200 p-8 px-12 text-black max-md:flex-col max-md:items-start max-md:gap-y-4">
      <div className="flex items-center gap-x-4">
        <img
          src={previewImage || user?.image}
          alt={`Profile-${user?.firstName}`}
          className="aspect-square w-12 md:w-16 rounded-full object-cover"
        />
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Change Profile Picture
          </p>
          <div className="flex gap-3 max-md:flex-col max-md:gap-y-2">
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleDisplayImage}
            />
            <button
              className="cursor-pointer rounded-md bg-gray-500 py-2 px-5 font-semibold text-gray-50"
              onClick={handleClick}
            >
              Select
            </button>
            <button
              className="flex items-center justify-center gap-2 rounded-md bg-gray-500 py-2 px-5 font-semibold text-gray-50"
              onClick={displayImageUploader}
            >
              <span>{loading ? "Uploading" : "Upload"}</span>
              <FiUpload className="text-lg text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeProfileImage;
