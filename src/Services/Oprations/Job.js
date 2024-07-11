import toast from "react-hot-toast";
import { ApiConncector } from "./ApiConnector";

export const createJob = async (
  title,
  description,
  category,
  country,
  city,
  location,
  salaryFrom,
  salaryTo,
  fixedSalary,
  salaryType,token 
) => {
  // console.log("WE are in create Job Service ");
  const toastId = toast.loading("loading");
  let newJob = null;
  try {
    const response = await ApiConncector(
      "POST",
      `${process.env.REACT_APP_BASE_URL}job/post`,
      {
        title,
        description,
        category,
        country,
        city,
        location,
        salaryFrom,
        salaryTo,
        fixedSalary,
        salaryType,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

     
    );
    // console.log("Post Job API RESPONSE ", response);
    if (!response.data.success) {
      throw new Error(" Error Occured while creating the job ", response.data.message);
    }
    toast.success("Job Created  successfully");
    newJob = response.data;
  } catch (error) {
    // console.log("Error occured while creating the job ", error);
    // console.log("Error Message is ", error.response);
    toast.error(error.message);
    toast.dismiss(toastId);
  }
  toast.dismiss(toastId);
  return newJob;
};
