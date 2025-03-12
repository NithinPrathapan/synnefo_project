import React, { useEffect } from "react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import { setUser } from "./store/authSlice";
import axios from "axios";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(isLoaded);
  const { userData } = useSelector((state) => state.auth);

  const formData = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.emailAddresses[0].emailAddress,
    clerkId: user?.id,
    phoneNumber: user?.primaryPhoneNumber?.phoneNumber,
    imageUrl: user?.imageUrl,
  };

  useEffect(() => {
    if (isLoaded && isSignedIn && userData === null) {
      addUserData();

      fetchUserData();
    }
  }, [isLoaded, isSignedIn, userData, navigate]);

  useEffect(() => {
    if (userData && userData !== null && userData.role === "user") {
      navigate("/profile");
    }
  }, [navigate, userData]);

  // function add user data to the database
  async function addUserData() {
    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.user) {
        const user = await fetchUserData();
        console.log(user, "inside the fetch user function if user exists");
        dispatch(setUser(user));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // fetch user data

  const fetchUserData = async () => {
    console.log("fetch user data");
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/userdetails/" + user.id
      );

      console.log(response.data);
      return response.data.user;
    } catch (error) {
      console.log("error fetching user data", error);
    }
  };

  return (
    <div className="relative">
      <Navbar />

      <div className="h-screen overflow-hidden sm:px-4 md:px-8 lg:px-16 xl:px-32">
        <Routes>
          <Route path="/" element={<Home />} />

          {(userData && userData?.role === "user") || userData?.role === "" ? (
            <Route path="/profile" element={<ProfilePage />} />
          ) : (
            <Route path="/profile" element={<Dashboard />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
