import React, { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import CustomProfileIcon from "../custom-user-icon/CustomProfileIcon";
import UserDropDown from "../regiser-profile/UserDropDown";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex justify-between items-center h-16 px-12 relative">
      <Link className="" to="/">
        <div>
          <h1 className="text-2xl font-bold">JobX</h1>
        </div>
      </Link>
      <div className="relative z-50   ">
        {isSignedIn && isLoaded ? (
          <CustomProfileIcon
            setShowProfile={setShowProfile}
            showProfile={showProfile}
          />
        ) : (
          <SignInButton className="" />
        )}
        <div className="absolute right-4 top-12 w-[250px]">
          {showProfile ? (
            <UserDropDown
              showProfile={showProfile}
              setShowProfile={setShowProfile}
            />
          ) : (
            <> </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
