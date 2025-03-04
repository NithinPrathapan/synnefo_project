import React, { useEffect } from "react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import Home from "./pages/Home";

const App = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  console.log(isLoaded);

  return (
    <div className="">
      <Navbar />

      <div className="h-screen overflow-hidden sm:px-4 md:px-8 lg:px-16 xl:px-32">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
