import React, { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import CustomProfileIcon from "../custom-user-icon/CustomProfileIcon";
import RegisterProfile from "../regiser-profile/RegisterProfile";

const Navbar = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [showProfile, setShowProfile] = useState(false);

  console.log(user);

  return (
    <div className="flex items-center justify-between h-16 bg-amber-300 text-black px-12">
      <div>
        <h1 className="text-2xl font-bold">Ecom</h1>
      </div>
      <div className="relative">
        {isSignedIn ? (
          <CustomProfileIcon
            setShowProfile={setShowProfile}
            showProfile={showProfile}
          />
        ) : (
          <SignInButton className="" />
        )}
        {showProfile ? <RegisterProfile /> : <> </>}
      </div>
    </div>
  );
};

export default Navbar;
