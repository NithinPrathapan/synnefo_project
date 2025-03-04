import React from "react";
import { useUser } from "@clerk/clerk-react";

const CustomProfileIcon = ({ setShowProfile, showProfile }) => {
  const { user } = useUser();
  return (
    <div
      onClick={() => setShowProfile(!showProfile)}
      className="flex flex-col items-center"
    >
      <img
        className="rounded-full cursor-pointer"
        width={35}
        height={35}
        src={user.imageUrl}
        alt="usericon"
      />
    
    </div>
  );
};

export default CustomProfileIcon;
