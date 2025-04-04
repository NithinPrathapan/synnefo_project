import { SignOutButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserDropDown = ({ setShowProfile, showProfile }) => {
  const { user } = useUser();
  const { userData } = useSelector((state) => state.auth);

  return (
    <div className="  text-white rounded-md shadow-2xl bg-black p-6 flex flex-col gap-4 text-xl">
      <h1 className="font-semibold">Welcome {user.firstName} </h1>
      {userData?.role === "user" ? (
        <Link to="/profile">
          <button
            onClick={() => setShowProfile(false)}
            className="flex items-center justify-center"
          >
            <CgProfile size={25} /> Profile
          </button>
        </Link>
      ) : (
        <Link to="/dashboard">
          <button
            onClick={() => setShowProfile(false)}
            className="flex items-center justify-center gap-2"
          >
            <CgProfile size={25} /> Dashboard
          </button>
        </Link>
      )}
      <span className="border px-4 py-2 bg-black text-white cursor-pointer text-center rounded-md">
        <SignOutButton />
      </span>
    </div>
  );
};

export default UserDropDown;
