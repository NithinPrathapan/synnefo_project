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
    <div className="flex items-center justify-between h-16  text-black px-12 border-b border-b-slate-600 shadow-lg">
      <Link to="/">
        <div>
          <h1 className="text-2xl font-bold">JobX</h1>
        </div>
      </Link>
      <div className="relative">
        {isSignedIn && isLoaded ? (
          <CustomProfileIcon
            setShowProfile={setShowProfile}
            showProfile={showProfile}
          />
        ) : (
          <SignInButton className="" />
        )}
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
  );
};

export default Navbar;
