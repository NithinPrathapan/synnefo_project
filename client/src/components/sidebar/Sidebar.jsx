import React from "react";
import Close from "../close-icon/Close";
import { useSelector } from "react-redux";

const Sidebar = ({ openSidebar, setOpenSideBar }) => {
  const { userData } = useSelector((state) => state.auth);
  return (
    <div
      className={`bg-slate-950 text-white fixed top-0 left-0 h-screen w-[300px] flex flex-col items-center z-30 transition-transform duration-500 ease-in-out ${
        openSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="w-full border-b my-12">
        <h1 className="text-2xl font-bold  py2 w-full text-center ">JobX</h1>
      </div>
      <div
        onClick={() => setOpenSideBar(!openSidebar)}
        className="absolute top-0 w-[30px] h-[30px] right-2 "
      >
        <Close />
      </div>
    </div>
  );
};

export default Sidebar;
