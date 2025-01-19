"use client";

import CardTitle from "@/components/atoms/CardTitle";
import { Input } from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

interface DropdownState {
  isOpen: boolean;
  selected: string;
}

const EmployeeProfileAddress: React.FC = () => {
  const [dropdowns, setDropdowns] = useState<Record<string, DropdownState>>({
    state: { isOpen: false, selected: "" },
    city: { isOpen: false, selected: "" },
    country: { isOpen: false, selected: "" },
  });

  const options = {
    state: ["California", "Texas", "Florida", "New York"],
    city: ["Los Angeles", "Houston", "Miami", "New York City"],
    country: ["United States", "Canada", "Mexico", "United Kingdom"],
  };

  const toggleDropdown = (key: keyof typeof dropdowns): void => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: { ...prev[key], isOpen: !prev[key].isOpen },
    }));
  };

  const handleSelect = (key: keyof typeof dropdowns, option: string): void => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: { isOpen: false, selected: option },
    }));
  };

  return (
    <>
      <CardTitle className="text-[#243045] font-semibold font-lg dark:text-white">
        Address Details
      </CardTitle>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Address 1 */}
        <div className="relative w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <Label
            htmlFor="address1"
            className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white dark:bg-darkPrimaryBg dark:text-white"
          >
            Address Line 1
          </Label>
          <Input
            type="text"
            id="address-one"
            placeholder="Enter Address"
            className="font-normal lg:text-base text-gray-900 placeholder:text-black dark:placeholder:text-white"
          />
        </div>

        {/* Address 2 */}
        <div className="relative w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <Label
            htmlFor="address2"
            className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white dark:bg-darkPrimaryBg dark:text-white"
          >
            Address Line 2
          </Label>
          <Input
            type="text"
            id="address-two"
            placeholder="Enter Address"
            className="font-normal lg:text-base text-gray-900 placeholder:text-black dark:placeholder:text-white"
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        {(["state", "city", "country"] as const).map((key) => (
          <div
            key={key}
            className="relative mt-3 w-full border shadow-sm ease-in-out border-gray-300 rounded-lg px-4 pt-4 pb-5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 cursor-pointer"
            onClick={() => toggleDropdown(key)}
          >
            <Label
              htmlFor={`select-${key}`}
              className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white dark:bg-darkPrimaryBg dark:text-white"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Label>
            <div className="w-full flex items-center justify-between">
              <span className="block px-4">
                {dropdowns[key].selected ||
                  `Select ${key.charAt(0).toUpperCase() + key.slice(1)}`}
              </span>
              <FaCaretDown className="text-[#1768D0] mr-4" />
            </div>
            {dropdowns[key].isOpen && (
              <ul
                className="absolute z-10 mt-7 w-full bg-white border border-gray-300 rounded-md shadow-lg left-0 max-h-60 overflow-y-auto animate-slide-down"
                role="menu"
                onClick={(e) => e.stopPropagation()} // Prevent propagation to parent div
              >
                {options[key].map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 cursor-pointer text-sm hover:bg-[#1768D0] hover:text-white transition-all duration-300 dark:text-black"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent propagation to parent div
                      handleSelect(key, option);
                    }}
                    role="menuitem"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Zip */}
        <div className="mt-3 relative w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <Label
            htmlFor="zip"
            className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white dark:bg-darkPrimaryBg dark:text-white"
          >
            Zip/Postal Code
          </Label>
          <Input
            type="text"
            id="zip"
            placeholder="16258"
            className="font-normal lg:text-base text-gray-900 placeholder:text-black dark:placeholder:text-white"
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeProfileAddress;
