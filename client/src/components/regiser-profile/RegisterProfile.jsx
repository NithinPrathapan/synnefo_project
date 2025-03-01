import { SignOutButton } from "@clerk/clerk-react";
import React from "react";

const RegisterProfile = () => {
  return (
    <div className="absolute w-full mt-4 py-12 bg-amber-400 px-12 right-0 border  rounded-md">
      <div className="w-full">
        <SignOutButton />
      </div>
    </div>
  );
};

export default RegisterProfile;
