import React from "react";

const JobCard = () => {
  return (
    <div className="max-w-[320px] mt-12 rounded-md  mx-12 flex flex-col gap-4 bg-[#000] p-4 py-6">
      <div className="flex items-center justify-start gap-4  max-w-[250px]">
        <img
          className="w-[50px]"
          src="https://www.logoai.com/oss/icons/2021/10/27/MuCSnBxFpOQg2Kl.png"
          alt="company_logo"
        />
        <h1 className=" tracking-wide font-semibold text-white">Infosys</h1>
      </div>
      <div>
        <h1 className="flex items-center justify-start gap-2 text-sm text-[#c4c4c4]">
          India <span>2 Days Ago</span> Over 100 Applicants
        </h1>
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-white">React Developer</h1>
      </div>
      <div className="flex items-center justify-start gap-2">
        <h1 className="bg-teal-900 px-2 py-1 rounded-md text-white">Remote</h1>
        <h1 className="bg-teal-800 px-2 py-1 rounded-md text-white">
          Full-time
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
        <p className="text-[#c4c4c4]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          repellat voluptatibus maiores!
        </p>
      </div>
    </div>
  );
};

export default JobCard;
