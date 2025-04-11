import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedJobs } from "../../store/jobSeekerSlice";
import JobCard from "../../components/job-card/JobCard";

const ViewSavedJobs = () => {
  const { savedJobs } = useSelector((state) => state.jobSeeker);
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userid = userData?.jobSeeker?._id;

  return (
    <div className="flex ">
      {savedJobs.map((job) => {
        return <JobCard key={job._id} jobDetails={job} />;
      })}
    </div>
  );
};

export default ViewSavedJobs;
