import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice";
import jobReducer from "../Slices/jobSlice";
import applicationReducer from "../Slices/applicationSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
  application: applicationReducer,
});
export default rootReducer;
