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
import useAppliedJobs from "./hooks/UseAppliedJobs";
import ViewAppliedJobs from "./pages/jobSeeker-pages/ViewAppliedJobs";
import ViewSavedJobs from "./pages/jobSeeker-pages/ViewSavedJobs";
import { fetchSavedJobs } from "./store/jobSeekerSlice";
import { Particles } from "./components/Particles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewApplicants from "./pages/Recruiter-pages/ViewApplicants";
import EditJob from "./pages/Recruiter-pages/EditJob";
import { fetchJobs } from "./store/recruiterSlice";
const App = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  const { userData } = useSelector((state) => state.auth);

  const jobSeekerId = userData?.jobSeeker?._id;
  const recruiterId = userData?.recruiter?._id;

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

  useEffect(() => {
    if (userData && isLoaded && jobSeekerId) {
      dispatch(fetchSavedJobs(jobSeekerId));
    }
  }, [userData, isLoaded, jobSeekerId]);

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

  // !recruiter data fetch

  useEffect(() => {
    if (recruiterId) {
      dispatch(fetchJobs(recruiterId));
    }
  }, [recruiterId]);

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

  const { appliedJobs, loading, error } = useAppliedJobs(jobSeekerId);

  return (
    <div className="relative">
      {/* <SplashCursor /> */}
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      {/* <div className="absolute min-w-screen h-screen">
      <Particles />
    </div> */}
      {/* <CheckOnline /> */}
      <div className="h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<UnauthorizedPage />} />

          {user && userData?.role && (
            <>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="createjob" element={<CreateJob />} />
                <Route path="viewprofile" element={<ViewProfile />} />
                <Route path="viewpostedjobs" element={<ViewPostedJobs />} />
                <Route path="savedjobs" element={<ViewSavedJobs />} />

                {userData.role === "recruiter" && (
                  <Route index element={<ViewPostedJobs />} />
                )}
                {userData.role === "job_seeker" && (
                  <Route index element={<ViewAppliedJobs />} />
                )}
              </Route>

              {/* Profile Page for 'user' role */}
              {userData.role === "user" && (
                <Route path="/profile" element={<ProfilePage />} />
              )}

              {/* Recruiter-specific Routes */}
              {userData.role === "recruiter" && (
                <>
                  <Route
                    path="viewapplicants/:id"
                    element={<ViewApplicants />}
                  />
                  <Route path="editjob/:id" element={<EditJob />} />
                </>
              )}
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
