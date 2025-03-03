import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  const [userProfile, setUserProfile] = useState(null);
  console.log(userProfile);
  const { isSignedIn, user, isLoaded } = useUser();

  console.log(isSignedIn);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      handleAuthentication();
    }
  }, [isSignedIn, isLoaded, user]);

  useEffect(() => {
    fetchUserDetails();
  },[userProfile]);

  async function fetchUserDetails() {
    try {
      const response = await fetch(
        `http://localhost:4000/api/auth/${user?.id}`
      );

      setUserProfile(await response.json());
    } catch (error) {
      console.log(error);
    }
  }
  async function handleAuthentication() {
    try {
      const userData = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.primaryEmailAddress?.emailAddress,
        phoneNumber: user?.primaryPhoneNumber?.phoneNumber,
        clerkId: user?.id,
        imageUrl: user?.imageUrl,
      };
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
