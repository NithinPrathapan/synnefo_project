import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import recruiterReducer from "./recruiterSlice.js";
import { thunk } from "redux-thunk";
const store = configureStore({
  reducer: {
    auth: authReducer,
    recruiter: recruiterReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export default store;

