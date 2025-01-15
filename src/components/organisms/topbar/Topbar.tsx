import TopLeft from "@/components/molecules/Topbar/TopLeft";
import TopRight from "@/components/molecules/Topbar/TopRight";
import React from "react";

const Topbar = () => {
  return (
    <div className="flex p-3 bg-white shadow-sm rounded-md w-full sticky top-0 z-[50] flex-shrink-0 dark:bg-darkPrimaryBg dark:text-white">
      <div className=" basis-[30%]">
        <TopLeft />
      </div>
      <div className=" basis-[70%] flex justify-end items-center">
        <TopRight />
      </div>
    </div>
  );
};

export default Topbar;
