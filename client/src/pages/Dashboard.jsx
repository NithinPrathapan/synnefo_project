import React, { useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import Sidebar from "../components/sidebar/Sidebar";

const Dashboard = () => {
  const [openSidebar, setOpenSideBar] = useState(true);
  return (
    <div className="my-6">
      <button
        className=" absolute left-0"
        onClick={() => setOpenSideBar(!openSidebar)}
      >
        {openSidebar ? (
          <GoSidebarCollapse size={30} />
        ) : (
          <GoSidebarExpand size={30} />
        )}
      </button>
      <div className="">
        {openSidebar ? (
          <Sidebar openSidebar={openSidebar} setOpenSideBar={setOpenSideBar} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
