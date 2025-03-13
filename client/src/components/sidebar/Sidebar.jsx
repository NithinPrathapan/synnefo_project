import React from "react";
import Close from "../close-icon/Close";
import { useSelector } from "react-redux";
import WorkIcon from "@mui/icons-material/Work";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import BookIcon from "@mui/icons-material/Book";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Sidebar = ({ openSidebar, setOpenSideBar }) => {
  const { userData } = useSelector((state) => state.auth);
  console.log(userData);
  const recruiterList = [
    {
      label: "View posted jobs",
      icon: <WorkIcon className="hover:text-amber-200" color="" />,
    },
    {
      label: "Create a job",
      icon: <Add className="hover:text-amber-200" color="" />,
    },
    {
      label: "Edit profile",
      icon: <Edit className="hover:text-amber-200" color="" />,
    },
  ];
  const jobSeekerList = [
    {
      label: "View applied jobs",
      icon: <WorkIcon className="hover:text-amber-200" color="" />,
    },
    {
      label: "View saved Jobs",
      icon: <BookIcon className="hover:text-amber-200" color="" />,
    },
  {
      label: "Shortlisted by recruiter",
      icon: (
        <KeyboardArrowRightIcon className="hover:text-amber-200" color="" />
      ),
    },
    {
      label: "Edit Profile",
      icon: <Edit className="hover:text-amber-200" color="" />,
    },
  ];
  return (
    <div
      className={`bg-slate-950 text-white fixed top-0 left-0 h-screen w-[300px] flex flex-col items-center z-30 transition-transform duration-500 ease-in-out ${
        openSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        onClick={() => setOpenSideBar(!openSidebar)}
        className="absolute top-0 w-[30px] h-[30px] right-2 "
      >
        <Close />
        <svg data-testid="WorkIcon"></svg>
      </div>
      <div className="w-full border-b  py-6 mb-12">
        <h1 className="text-2xl font-bold  w-full text-center ">JobX</h1>
      </div>
      {userData && userData.role === "recruiter" ? (
        <div className="flex flex-col justify-start items-start gap-4 w-full px-6 ">
          {recruiterList.map((item) => (
            <div className="flex justify-between hover:text-amber-200 hover:cursor-pointer items-center gap-4 border-b pb-2 w-full my-4">
              <h1 className="cursor-pointer  transition-all ease-in-out duration-300">
                {item.label}
              </h1>
              <div>{item.icon}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-start items-start gap-4 w-full px-6">
          {jobSeekerList.map((item) => (
            <div className="flex justify-between hover:text-amber-200 hover:cursor-pointer items-center gap-4 border-b pb-2 w-full my-4">
              <h1 className="cursor-pointer  transition-all ease-in-out duration-300">
                {item.label}
              </h1>
              <div>{item.icon}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
