import React from "react";
import { TimeRemainingIcon } from "@/components/atoms";
import CardTitle from "@/components/atoms/CardTitle";
import Paragraph from "@/components/atoms/Paragraph";
function TimeRemaining() {
  return (
    <div className="flex items-center justify-between bg-[#FFFFFF] shadow-light-shadow rounded-md py-3 px-3">
      <div className="flex gap-2">
        <TimeRemainingIcon />
        <CardTitle className="text-sm text-black font-semibold">
          Time Remaining
        </CardTitle>
      </div>
      <div>
        <Paragraph className="gradient-text text-xl font-semibold">
          12:10
        </Paragraph>
      </div>
    </div>
  );
}

export default TimeRemaining;
