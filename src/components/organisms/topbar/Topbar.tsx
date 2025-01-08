import TopLeft from "@/components/molecules/Topbar/TopLeft";
import TopRight from "@/components/molecules/Topbar/TopRight";
import React from "react";

const Topbar = () => {
  return (
    <div className="flex py-2.5 px-6 bg-white shadow-sm rounded-md w-full border">
      <div className=" basis-[30%]">
        <TopLeft />
      </div>
      <div className=" basis-[70%]">
        <TopRight />
      </div>
    </div>
  );
};

export default Topbar;
