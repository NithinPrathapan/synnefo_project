import React from "react";

const Hero = () => {
  return (
    <div
      id="hero-component-container"
      className=" realtive sm:m-4 z-0  flex  w-full sm:w-4/5 mx-auto md:w-3/5  text-gray-400 justify-center items-center"
    >
      <div className="">
        <h1 className="hero-text lg:text-6xl  text-3xl font-bold text-white font-sans  tracking-wide ">
          Find a job that suits <br /> your skills and interests
        </h1>
        <div className="flex items-center justify-between bg-white rounded-xl my-6">
          <input type="text" className="h-12 w-full pl-4 outline-none" />
          <button className="bg-black text-white h-12 font-semibold tracking-wide cursor-pointer px-8 rounded-tr-md rounded-br-md">
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
