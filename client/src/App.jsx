import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const App = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (user) {
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        imageUrl: user.imageUrl,
        clerkId: user.id,
        phoneNumber: user.primaryPhoneNumber.phoneNumber,
      };
      console.log(userData);
      axios
        .post("http://localhost:4000/api/auth/signup", userData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);
  return (
    <div className="">
      <Navbar />
    </div>
  );
};

export default App;
