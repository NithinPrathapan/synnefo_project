import React from "react";

const LiveDetails = () => {
  return (
    <div className="flex p-4 rounded-lg border-white border-2 text-white  max-w-[200px]">
      <div>
        <img
          src="https://imgs.search.brave.com/v-dR1Xz79Z3VrSINKJ9bMz8dFbUV5Cdhxx6jAIVEsBM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW1nbG9iYWwuY29t/L2ltYWdlcy9saWJy/YXJ5L3RoZS1pbWct/YWR2YW50YWdlLS0t/c3ZnLWdyYXBoaWNz/L2ltZy1hZHYtLTUw/MC1lbXBsb3llZXMu/c3Zn"
          alt="nothin"
        />
      </div>
      <div className="flex flex-col gap-4 items-start justify-start">
        <h1 className="text-xl font-bold">80000</h1>
        <p className="font-semibold">Companies</p>
      </div>
    </div>
  );
};

export default LiveDetails;
