import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const baseUrl = "http://localhost:4000/api/recruiter";

const initialState = {
  postedJobs: [],
  loading: false,
  error: null,
};
const recruiterSlice = createSlice({
  name: "recruiter",
  initialState,
  reducers: {
    fetchJobsStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchJobsSuccess(state, action) {
      state.loading = false;
      state.postedJobs = action.payload;
    },
    fetchJobFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchJobsStart, fetchJobsSuccess, fetchJobFailure } =
  recruiterSlice.actions;

export const fetchJobs = (userId) => async (dispatch) => {
  try {
    if (!userId) throw new Error("userId not found in auth state");
    const response = await axios.get(`${baseUrl}/getAllJobs/${userId}`);
    console.log(response);
    dispatch(fetchJobsSuccess(response.data.jobs));
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    dispatch(fetchJobFailure(errorMessage));
  }
};

export default recruiterSlice.reducer;
