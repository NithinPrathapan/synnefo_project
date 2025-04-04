import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import recruiterReducer from "./recruiterSlice.js";
import jobSeekerReducer from "./jobSeekerSlice.js";
import { thunk } from "redux-thunk";
const store = configureStore({
  reducer: {
    auth: authReducer,
    recruiter: recruiterReducer,
    jobSeeker: jobSeekerReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export default store;

