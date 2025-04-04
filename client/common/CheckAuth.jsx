import React from "react";
import { useNavigate } from "react-router-dom";

const CheckAuth = ({ user, isAuthenticated }) => {
  console.log(isAuthenticated);
  const navigate = useNavigate();
  console.log(location.pathname);
  return (
    <div>
      checkauth component
      {!isAuthenticated &&
        location.pathname.includes("/profile") &&
        navigate("/dashboard")}
    </div>
  );
};

export default CheckAuth;
