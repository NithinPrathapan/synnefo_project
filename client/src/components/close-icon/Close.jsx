import React from "react";

const Close = () => {
  return (
    <div className="container w-[20px] h-[30px] p-4 absolute right-0 cursor-pointer group">
      <div className="bg-slate-200 w-1 h-[20px] rotate-45 absolute transition-transform duration-300 ease-in-out group-hover:rotate-[135deg]"></div>
      <div className="bg-slate-200 w-1 h-[20px] -rotate-45 absolute transition-transform duration-300 ease-in-out group-hover:-rotate-[135deg]"></div>
    </div>
  );
};

export default Close;
