import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const baseUrl = "http://localhost:4000/api";

const initialState = {
  appliedJobs: [],
  savedJobs: [],
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

    fetchSavedJobsStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchSavedJobsSuccess(state, action) {
      state.loading = false;
      state.savedJobs = action.payload;
    },
    fetchSavedJobsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAppliedJobsStart,
  fetchAppliedJobsSuccess,
  fetchAppliedJobsFailure,
  fetchSavedJobsStart,
  fetchSavedJobsSuccess,
  fetchSavedJobsFailure,
} = jobSeekerSlice.actions;

export const fetchAppliedJobs = (userId) => async (dispatch) => {
  fetchAppliedJobsStart();
  try {
    if (!userId) throw new Error("userId not found in auth state");
    const response = await axios.get(`${baseUrl}/job/savedJobs/${userId}`);
    dispatch(fetchAppliedJobsSuccess(response.data.jobs));
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    dispatch(fetchAppliedJobsSuccess(errorMessage));
  }
};

export const fetchSavedJobs = (userId) => async (dispatch) => {
  fetchSavedJobsStart();
  try {
    if (!userId) throw new Error("userId not found in auth state");
    const response = await axios.get(`${baseUrl}/job/savedjobs/${userId}`);

    dispatch(fetchSavedJobsSuccess(response.data.jobs));
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    dispatch(fetchSavedJobsFailure(errorMessage));
  }
};

export default jobSeekerSlice.reducer;
