import React, { useEffect, useState } from "react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import Navbar from "./components/navbar/Navbar";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import { setUser } from "./store/authSlice";
import axios from "axios";
import Dashboard from "./pages/Dashboard";
import CreateJob from "./pages/CreateJob";
import ViewProfile from "./pages/ViewProfile";
import ViewPostedJobs from "./pages/Recruiter-pages/ViewPostedJobs";
import SplashCursor from "./components/splash-color/Splash";
import CheckOnline from "../hoooks/CheckOnline";
import CheckAuth from "../common/CheckAuth";
import UnauthorizedPage from "./pages/UnauthorizedPage";

const App = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  const { userData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAuthenticated, setisAuthenticated] = useState(false);

  const formData = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.emailAddresses[0].emailAddress,
    clerkId: user?.id,
    phoneNumber: user?.primaryPhoneNumber?.phoneNumber,
    imageUrl: user?.imageUrl,
  };

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      handleUserAuth();
    }
  }, [isLoaded]);

  // useEffect(() => {
  //   if (userData?.role === "user") {
  //     navigate("/profile");
  //   }
  // }, [navigate, userData]);

  useEffect(() => {
    if (isSignedIn && isLoaded && user) {
      setisAuthenticated(true);
    }
  }, [isLoaded, isSignedIn, user]);

  const handleUserAuth = async () => {
    const existingUser = await fetchUserData();
    // console.log(existingUser, "existing user");
    if (existingUser) {
      dispatch(setUser(existingUser));
    } else {
      await registerUser();
    }
  };

  // function add user data to the database
  async function registerUser() {
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

  // fetch user data and stored inside the redux store
  const fetchUserData = async () => {
    console.log("fetch user data");
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/userdetails/" + user.id
      );

      return response.data.user;
    } catch (error) {
      console.log("error fetching user data", error);
    }
  };
  // =================================================================
  return (
    <div className="relative">
      {/* <SplashCursor /> */}
      <Navbar />
      {/* <CheckOnline /> */}

      <div className="h-screen ">
        <Routes>
          <Route path="*" element={<UnauthorizedPage />} />
          {user && userData?.role === "user" && (
            <Route path="/profile" element={<ProfilePage />} />
          )}
          <Route path="/" element={<Home />} />
          {/* common for every guest users not registered or not */}

          {user && userData?.role !== "" && (
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="" element={<ViewPostedJobs />} />
              <Route path="createjob" element={<CreateJob />} />
              <Route path="viewprofile" element={<ViewProfile />} />
              <Route path="viewpostedjobs" element={<ViewPostedJobs />} />
            </Route>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
