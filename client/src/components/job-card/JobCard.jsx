import React, { useEffect, useState } from "react";

const JobCard = ({ jobDetails }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [timeAgo, setTimeAgo] = useState("");

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

  console.log(jobDetails);
  const companyDetail = jobDetails?.postedBy?.companyDetails;
  return (
    <div className="max-w-[320px] mt-12 rounded-md  mx-12 flex flex-col gap-4 bg-transparent border-[0.5px] border-slate-700 p-4 py-6">
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
      <div className="flex items-center justify-start gap-2">
        <button className="cursor-pointer duration-300 ease-in transition-all bg-[#0c7ff1] hover:bg-[#004182] px-12 py-1 rounded-full text-white hover:text-[#c4c4c478]">
          Apply
        </button>
        <button className="cursor-pointer duration-300 ease-in transition-all px-12 py-1 rounded-full border-[#0c7ff1] text-[#0c7ff1] hover:border-[#004182] border-2 hover:text-[#004182]">
          Save
        </button>
      </div>
      <div>
        <p className="text-[#c4c4c4]">{jobDetails?.description}</p>
      </div>
    </div>
  );
};

export default JobCard;
