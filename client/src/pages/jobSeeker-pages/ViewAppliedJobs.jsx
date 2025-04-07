import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/job-card/JobCard";

const ViewAppliedJobs = () => {
  const { appliedJobs } = useSelector((state) => state.jobSeeker);
  console.log("hai");
  console.log(appliedJobs);
  return (
    <div className="flex items-center justify-center">
      {appliedJobs.map((job) => {
        return <JobCard key={job._id} jobDetails={job} />;
      })}
    </div>
  );
};

export default ViewAppliedJobs;




