import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import useToastNotification from "../../hooks/UseNotification";
const UserCard = ({ userData }) => {
  const { id } = useParams();

  // !function to shortlist the user
  async function handleShortList(userId) {
    try {
      let action = "shortlist";
      const response = await axios.post(
        `http://localhost:4000/api/recruiter/selectorshortlist/${id}`,
        {
          userId,
          action,
        }
      );
      if (response.status === 200) {
        useToastNotification().showToast(response.data.message, "success");
      }
    } catch (error) {
      console.log(error, "eroor");
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
        useToastNotification().showToast(error.response.data.message, "error");
      }
    }
  }

  async function handleSelect(userId) {
    try {
      let action = "select";
      const response = await axios.post(
        `http://localhost:4000/api/recruiter/selectorshortlist/${id}`,
        {
          userId,
          action,
        }
      );
      if (response.status === 200) {
        useToastNotification().showToast(response.data.message, "success");
      }
    } catch (error) {
      console.log(error, "eroor");
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
        useToastNotification().showToast(error.response.data.message, "error");
      }
    }
  }
  console.log(id);
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
        <button
          onClick={(e) => {
            handleShortList(userData._id);
          }}
          className="bg-yellow-700 text-white font-semibold px-2 py-1 rounded-md cursor-pointer"
        >
          Shortlist
        </button>
        <button
          onClick={(e) => {
            handleSelect(userData._id);
          }}
          className="bg-green-400 text-white font-semibold px-2 py-1 rounded-md cursor-pointer"
        >
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
