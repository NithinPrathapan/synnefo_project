import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppliedJobs } from "../store/jobSeekerSlice";

const useAppliedJobs = (jobSeekerId) => {
  const dispatch = useDispatch();
  const { appliedJobs, loading, error } = useSelector(
    (state) => state.jobSeeker
  );

  useEffect(() => {
    if (jobSeekerId && !appliedJobs.length && !loading) {
      dispatch(fetchAppliedJobs(jobSeekerId));
    }
  }, [dispatch, jobSeekerId, loading]);

  return { appliedJobs, loading, error };
};

export default useAppliedJobs;
