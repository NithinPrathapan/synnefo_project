import React, { useEffect, useState } from "react";
import JobCard from "../components/job-card/JobCard";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const Home = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetchJobs();
  }, []);
  const fetchJobs = async (req, res) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/alljobs"
      );

      setJobs(response.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center ">
      {jobs.map((job) => {
        return <JobCard key={job._id} jobDetails={job} />;
      })}
    </div>
  );
};

export default Home;
