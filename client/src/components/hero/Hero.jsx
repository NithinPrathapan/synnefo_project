import React from "react";

const Hero = () => {
  return (
    <div
      id="hero-component-container"
      className=" realtive sm:m-4 z-0  flex   items-center text-gray-400"
    >
      <div className="   bg-amber-100 rounded-full    lg:p-12 mx-12 flex flex-col gap-4">
        <h1 className="hero-text lg:text-6xl  text-3xl font-bold text-blue-900 font-sans  tracking-wide ">
          Find a job that suits <br /> your skills and interests
        </h1>
        <div className="flex items-center justify-between w-4/5">
          <input type="text" className="max-w-[82%] border-black " />
          <button className=" bg-transparent border-2 border-black text-black py-2 px-8">
            Search
          </button>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
