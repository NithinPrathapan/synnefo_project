import React from "react";
import Close from "../close-icon/Close";
import { useSelector } from "react-redux";
import WorkIcon from "@mui/icons-material/Work";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import BookIcon from "@mui/icons-material/Book";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { userData } = useSelector((state) => state.auth);
  const recruiterList = [
    {
      label: "View posted jobs",
      icon: <WorkIcon className="hover:text-slate-700" color="" />,
      href: "/dashboard",
    },
    {
      label: "Create a job",
      icon: <Add className="hover:text-slate-700" color="" />,
      href: "createjob",
    },
    {
      label: "View / update profile",
      icon: <Edit className="hover:text-slate-700" color="" />,
      href: "viewprofile",
    },
  ];
  const jobSeekerList = [
    {
      label: "View applied jobs",
      icon: <WorkIcon className="hover:text-slate-700" color="" />,
    },
    {
      label: "View saved Jobs",
      icon: <BookIcon className="hover:text-slate-700" color="" />,
    },
    {
      label: "Shortlisted by recruiter",
      icon: (
        <KeyboardArrowRightIcon className="hover:text-slate-700" color="" />
      ),
    },
    {
      label: "Edit Profile",
      icon: <Edit className="hover:text-slate-700" color="" />,
      href: "viewprofile",
    },
  ];
  return (
    <div className="flex ">
      {userData && userData.role === "recruiter" ? (
        <div className="flex flex-col justify-start items-start gap-4 w-full px-6 ">
          {recruiterList.map((item) => (
            <Link className="w-full" to={item.href}>
              <div className="flex justify-between  hover:text-slate-700 hover:cursor-pointer items-center gap-4 border-b pb-2 w-full my-4">
                <h1 className="cursor-pointer  w-full transition-all ease-in-out duration-300">
                  {item.label}
                </h1>
                <div>{item.icon}</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-start items-start gap-4 w-full px-6">
          {jobSeekerList.map((item) => (
            <Link to={item.href}>
              <div className="flex justify-between hover:text-amber-200 hover:cursor-pointer items-center gap-4 border-b pb-2 w-full my-4">
                <h1 className="cursor-pointer w-full transition-all ease-in-out duration-300">
                  {item.label}
                </h1>
                <div>{item.icon}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
