import React, { useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = ({ children }) => {
  const { userData } = useSelector((state) => state.auth);
  return (
    <div className="flex gap-12">
      <div className="bo w-[300px] py-12 h-screen shadow-md ">
        <Sidebar />
      </div>
      <div className="w-full ">
        <h1 className="text-3xl text-center uppercase my-12">
          {userData?.role} Dashboard
        </h1>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
