import React, { useEffect } from "react";
import { CiBookmark } from "react-icons/ci";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import useToastNotification from "../../hooks/UseNotification";
import { Link } from "react-router-dom";

const JobCard = ({
  jobDetails,
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const [imageSrc, setImageSrc] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const { savedJobs } = useSelector((state) => state.jobSeeker);
  const { userData } = useSelector((state) => state.auth);
  const { appliedJobs } = useSelector((state) => state.jobSeeker);

  const { showToast } = useToastNotification();

  useEffect(() => {
    if (jobDetails?.createdAt) {
      const deadlineDate = new Date(jobDetails.createdAt);
      const now = new Date();

      const differenceInMs = deadlineDate - now;
      const differenceInDays = Math.floor(
        differenceInMs / (1000 * 60 * 60 * 24)
      );

      let timeText = "";

      if (differenceInDays < 0) {
        timeText = `${Math.abs(differenceInDays)} days ago`;
      } else if (differenceInDays === 0) {
        timeText = "Today";
      } else {
        timeText = `In ${differenceInDays} days`;
      }

      setTimeAgo(timeText);
    }
  }, [jobDetails]);

  useEffect(() => {
    if (savedJobs) {
      const isJobSaved = savedJobs.some(
        (savedJob) => savedJob._id === jobDetails._id
      );
      setIsSaved(isJobSaved);
    }
  }, [isSaved, savedJobs, jobDetails]);
  useEffect(() => {
    if (jobDetails?.thumbnail) {
      const imageUrl = `http://localhost:4000/uploads/${jobDetails.thumbnail}`;

      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const objectUrl = URL.createObjectURL(blob);
          setImageSrc(objectUrl);
        })
        .catch((error) => console.error("Error fetching image:", error));
    }
  }, [jobDetails]);

  const companyDetail = jobDetails?.postedBy?.companyDetails;

  // the spotlit functions
  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  // handle apply job functionality to the user type if job seeker

  const handleApplyJob = async (jobId) => {
    console.log(jobId);

    try {
      const response = await axios.post(
        `http://localhost:4000/api/job/${jobId}/${userData.jobSeeker?._id}`
      );

      showToast("Success!! Applied to job", "success");
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error:", error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.log("Unexpected error:", error.message);
      }
      showToast("Failed!!! Apply to job", "error");
    }
  };

  const handleSaveJob = async () => {
    console.log("inside the save job");
    try {
      const response = await axios.post(
        `http://localhost:4000/api/job/savejob/${jobDetails._id}/${userData.jobSeeker?._id}`
      );
      console.log(response);
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error:", error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.log("Unexpected error:", error.message);
      }
    }
  };

  const handleEditjob = async () => {};

  //! view applicants details

  async function handleViewApplicants() {}

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border flex flex-col gap-4 border-neutral-800 bg-black  overflow-hidden p-8 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 90%)`,
        }}
      />

      <div className="flex items-center justify-start gap-4  max-w-[250px]">
        <img
          className="w-[50px]"
          src={
            imageSrc
              ? imageSrc
              : "https://imgs.search.brave.com/_jCb7UYLbqT4_SLtVxXC1kQMR69JJ0AzKRnsUY3oueM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzExLzk1LzUz/LzM2MF9GXzkxMTk1/NTM5Nl9VV3I2cnQ5/cVF1ajFscHZIdkVD/Uko3NnpnMExGZjc1/eS5qcGc"
          }
          alt="company_logo"
        />
        <h1 className=" tracking-wide font-semibold text-white">
          {companyDetail?.companyName}
        </h1>
      </div>
      <div>
        <h1 className="flex items-center justify-start gap-2 text-sm text-[#c4c4c4]">
          {jobDetails?.location} <span>{timeAgo}</span>{" "}
          {jobDetails?.applicants?.length === 0
            ? "0 applicants"
            : jobDetails?.applicants?.length}
        </h1>
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-white">
          {jobDetails?.title}
        </h1>
      </div>
      <div className="flex items-center justify-start gap-2">
        <h1 className="bg-gray-400 px-2 py-1 rounded-md text-black text-sm">
          {jobDetails?.jobType}
        </h1>
        <h1 className="bg-teal-800 px-2 py-1 rounded-md text-white text-sm">
          {jobDetails?.status}
        </h1>
      </div>
      {userData?.role !== "recruiter" ? (
        <div className="flex items-center justify-start gap-2">
          <button
            onClick={() => handleApplyJob(jobDetails._id)}
            disabled={appliedJobs?.some(
              (job) => String(job._id) === String(jobDetails?._id)
            )}
            className={`px-12 py-1 rounded-full text-white transition-all duration-300 ease-in 
    ${
      appliedJobs?.some((job) => String(job._id) === String(jobDetails?._id))
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#0c7ff1] hover:bg-[#004182] hover:text-[#c4c4c478] cursor-pointer"
    }`}
          >
            {appliedJobs?.some(
              (job) => String(job._id) === String(jobDetails?._id)
            )
              ? "Applied"
              : "Apply"}
          </button>
          <button
            onClick={handleSaveJob}
            className="cursor-pointer duration-300 ease-in transition-all px-12 py-1 rounded-full border-[#0c7ff1] text-[#0c7ff1] hover:border-[#004182] border-2 hover:text-[#004182]"
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-start gap-2">
          <Link to={"editjob/" + jobDetails?._id}>
            <button className="cursor-pointer duration-300 ease-in transition-all bg-[#0c7ff1] hover:bg-[#004182] px-12 py-1 rounded-full text-white hover:text-[#c4c4c478]">
              Edit job
            </button>
          </Link>
          <Link to={"/viewapplicants/" + jobDetails?._id}>
            <button className="cursor-pointer duration-300 ease-in transition-all px-12 py-1 rounded-full border-[#0c7ff1] text-[#0c7ff1] hover:border-[#004182] border-2 hover:text-[#004182]">
              View Applicants
            </button>
          </Link>
        </div>
      )}
      {/* <div>
        <p className="text-[#c4c4c4]">{jobDetails?.description}</p>
      </div> */}
      <div>
        {userData?.role !== "recruiter" ? (
          <button className="mx-auto flex ring-2 px-12 py-1 mt-2 rounded-md">
            View Details
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default JobCard;
