import { SignOutButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const UserDropDown = () => {
  const { user } = useUser();
  return (
    <div
      className="absolute shadow-2xl border my-4 rounded right-0 p-4 w-[200px]
     bg-white flex flex-col items-start justify-start gap-4 text-lg"
    >
      <h1 className="font-semibold">Welcome {user.firstName} </h1>
      <Link to="/profile">
        <button className="flex items-center  cursor-pointer justify-between gap-2">
          <CgProfile size={25} /> Profile
        </button>
      </Link>
      <p className="border px-4 py-2 bg-black text-white cursor-pointer">
        <SignOutButton />
      </p>
    </div>
  );
};
  
export default UserDropDown;
