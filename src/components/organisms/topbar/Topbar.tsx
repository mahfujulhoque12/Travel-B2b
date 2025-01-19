import TopLeft from "@/components/molecules/Topbar/TopLeft";
import TopRight from "@/components/molecules/Topbar/TopRight";
import React from "react";

const Topbar = () => {
  return (
    <div className="flex flex-col md:flex-row p-3 bg-white shadow-sm rounded-md w-full sticky top-0 z-[50] flex-shrink-0 dark:bg-darkPrimaryBg dark:text-white">
      <div className=" basis-[30%]">
        <TopLeft />
      </div>
      <div className=" basis-[70%] flex justify-start mt-3 md:mt-0  md:justify-end items-start md:items-center ">
        <TopRight />
      </div>
    </div>
  );
};

export default Topbar;
