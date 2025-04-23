import React from "react";

const UserCard = ({ userData }) => {
  return (
    <div className="bg-[#f3f4fa] text-black flex items-center justify-between p-4  mx-auto">
      <img width={25} src={userData?.user?.imageUrl} alt="" />
      <h1>
        {userData?.user?.firstName} {userData?.user?.lastName}{" "}
      </h1>
      <div className="flex  items-center  gap-6 w-[30%]   relative border-2 rounded-md">
        <div className="w-[40px] h-[60px] text-white  bg-[#F80707] flex items-center justify-center">
          Pdf
        </div>
        <div className="flex flex-col ">
          <h1 className="truncate">{userData?.resume}</h1>
          <button
            type="button"
            className=" cursor-pointer   absolute right-0 text-blue-600 "
            href=""
          >
            download
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {userData.skills[0].split(" ").map((item, index) => {
          return (
            <p className="bg--100 flex  border px-1" key={index}>
              {item}
            </p>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <button className="bg-yellow-700 text-white font-semibold px-2 py-1 rounded-md cursor-pointer">
          Shortlist
        </button>
        <button className="bg-green-400 text-white font-semibold px-2 py-1 rounded-md cursor-pointer">
          Select
        </button>
        <button className="bg-black text-white font-semibold px-2 py-1 rounded-md cursor-pointer">
          Reject
        </button>
      </div>
    </div>
  );
};

export default UserCard;
