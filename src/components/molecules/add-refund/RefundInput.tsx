import Label from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";

import React from "react";

const RefundInput = () => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* refund for */}
      <div className="relative w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        <Label
          htmlFor="booking-date"
          className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white"
        >
          Booking Id
        </Label>
        <Input
          type="text"
          id="booking-date"
          placeholder="Booking Id"
          className="font-normal lg:text-base text-gray-900 placeholder:text-black"
        />
      </div>

      {/* booking id */}
      <div className="relative w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        <Label
          htmlFor="refund-for"
          className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white"
        >
          Refund For
        </Label>
        <select
          id="refund-for"
          defaultValue=""
          className="w-full h-full border-none focus:ring-0 focus:outline-none font-normal lg:text-base text-gray-900 bg-transparent focus:bg-green-200"
        >
          <option value="" disabled>
            Select
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>

      {/* date  */}

      <div className="mt-5 relative w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        <Label
          htmlFor="booking-date"
          className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white"
        >
          Booking Date
        </Label>
        <Input
          type="date"
          id="booking-date"
          placeholder="Booking Date"
          className="font-normal lg:text-base text-gray-900 placeholder:text-black"
        />
      </div>

      {/* pnr */}

      <div className="relative mt-5 w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        <Label
          htmlFor="booking-date"
          className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white"
        >
          PNR No
        </Label>
        <Input
          type="text"
          id="pnr-id"
          placeholder="PNR Id"
          className="font-normal lg:text-base text-gray-900 placeholder:text-black"
        />
      </div>

    </div>
  );
};

export default RefundInput;
