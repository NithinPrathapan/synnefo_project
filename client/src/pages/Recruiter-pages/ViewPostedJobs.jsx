import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../store/recruiterSlice";
import JobCard from "../../components/job-card/JobCard";

const ViewPostedJobs = () => {
  const { userData } = useSelector((state) => state.auth);
  const { postedJobs } = useSelector((state) => state.recruiter);

  // console.log(postedJobs, "inside the view jobs");

  const dispatch = useDispatch();

  useEffect(() => {
    const userId = userData?.recruiter?._id;
    console.log(userId);
    if (!userId) {
      console.log("user not found");
      return;
    }
    dispatch(fetchJobs(userId));
  }, [dispatch, userData?.recruiter?._id]);

  return (
    <div className="flex gap-12">
      {postedJobs.map((job) => {
        return <JobCard key={job._id} jobDetails={job} />;
      })}
    </div>
  );
};

export default ViewPostedJobs;
