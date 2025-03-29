import React, { useEffect, useState } from "react";
import JobCard from "../components/job-card/JobCard";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import Hero from "../components/hero/Hero";
import heroVideo from "../assets/jobx-hero.mp4";

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
    <div>
      <div className="hero-section relative">
        <Hero />

        <div className="absolute right-12  bottom-14 p-4 rounded-xl  z-50">
          <video
            width={500}
            height={200}
            className="rounded-md object-cover shadow-xl"
            src={heroVideo}
            autoPlay
            loop
            muted
          ></video>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        {jobs.map((job) => {
          return <JobCard key={job._id} jobDetails={job} />;
        })}
      </div>
    </div>
  );
};

export default Home;
