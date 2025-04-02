import React, { useEffect, useState } from "react";
import JobCard from "../components/job-card/JobCard";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import Hero from "../components/hero/Hero";
import heroVideo from "../assets/jobx-hero.mp4";
import LiveDetails from "../components/live-details-section/LiveDetails";

const Home = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [jobs, setJobs] = useState([]);

  const liveDetails = [
    {
      icon: "home",
      count: "50000",
      title: "Live Jobs",
    },
    {
      icon: "home",
      count: "80000",
      title: "Companies",
    },
    {
      icon: "home",
      count: "50000",
      title: "Candidates",
    },
    {
      icon: "home",
      count: "50000",
      title: "New Jobs",
    },
  ];
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
        {/* live data section */}

        {/* live data section */}

        <div className="absolute right-12 lg:w-[420px] w-[350px]  h-[400px] bottom-14 p-4 rounded-xl  z-50 hidden md:flex">
          <video
            className="rounded-md object-cover shadow-2xl shadow-blue-900"
            src={heroVideo}
            autoPlay
            loop
            muted
          ></video>
        </div>
      </div>
      <div className="flex flex-wrap  sm:justify-evenly justify-center items-center sm:w-4/5 mx-auto gap-12">
        {liveDetails.map((item) => {
          return (
            <LiveDetails
              key={item.title}
              icon={item.icon}
              count={item.count}
              title={item.title}
            />
          );
        })}
      </div>
      <div className="text-white mx-auto max-w-8/12 my-12">
        <h1 className="text-4xl font-semibold">Featured Jobs</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-4 w-4/5 mx-auto">
        {jobs.map((job) => {
          return <JobCard key={job._id} jobDetails={job} />;
        })}
      </div>
    </div>
  );
};

export default Home;
