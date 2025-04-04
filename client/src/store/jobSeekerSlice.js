import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const baseUrl = "http://localhost:4000/api";

const initialState = {
  appliedJobs: [],
  loading: false,
  error: null,
};
const jobSeekerSlice = createSlice({
  name: "jobSeeker",
  initialState,
  reducers: {
    fetchAppliedJobsStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchAppliedJobsSuccess(state, action) {
      state.loading = false;
      state.appliedJobs = action.payload;
    },
    fetchAppliedJobsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAppliedJobsStart,
  fetchAppliedJobsSuccess,
  fetchAppliedJobsFailure,
} = jobSeekerSlice.actions;

export const fetchAppliedJobs = (userId) => async (dispatch) => {
  try {
    if (!userId) throw new Error("userId not found in auth state");
    const response = await axios.get(`${baseUrl}/job/${userId}`);
    console.log(response);
    dispatch(fetchAppliedJobsSuccess(response.data.jobs));
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    dispatch(fetchJobFailure(errorMessage));
  }
};

export default jobSeekerSlice.reducer;
