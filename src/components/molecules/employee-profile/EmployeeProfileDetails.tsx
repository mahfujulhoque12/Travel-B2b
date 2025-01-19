"use client";

import React, { useState, useEffect } from "react";
import CardTitle from "@/components/atoms/CardTitle";
import Label from "@/components/atoms/Label";
import { FaCaretDown, FaCalendarAlt } from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface State {
  isOpen: boolean;
  selectedOption: string;
  isDepartmentOpen: boolean;
  selectedDepartmentOption: string;
  isRoleOpen: boolean;
  selectedRoleOption: string;
  selectedDate: Date | undefined;
  showDatePicker: boolean;
}

const EmployeeProfileDetails: React.FC = () => {
  const [state, setState] = useState<State>({
    isOpen: false,
    selectedOption: "",
    isDepartmentOpen: false,
    selectedDepartmentOption: "",
    isRoleOpen: false,
    selectedRoleOption: "",
    selectedDate: undefined,
    showDatePicker: false,
  });

  const toggleState = (key: keyof State) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (key: keyof State, value: string) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
      [`${key.replace("selected", "is")}Open`]: false,
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setState((prev) => ({
      ...prev,
      selectedDate: date,
      showDatePicker: false,
    }));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest(".dropdown, .date-picker-container")) return;

      setState((prev) => ({
        ...prev,
        isOpen: false,
        isDepartmentOpen: false,
        isRoleOpen: false,
        showDatePicker: false,
      }));
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <CardTitle className="text-[#243045] font-semibold font-lg dark:text-white">
        Employee Details
      </CardTitle>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Job Title */}
        <div
          className="relative w-full border shadow-sm border-gray-300 rounded-lg px-4 pt-4 pb-5 cursor-pointer flex flex-col justify-between dropdown"
          onClick={(e) => {
            e.stopPropagation();
            toggleState("isOpen");
          }}
        >
          <Label
            htmlFor="job-title"
            className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white dark:text-white dark:bg-darkPrimaryBg"
          >
            Job Title
          </Label>
          <div className="w-full flex items-center justify-between">
            <span className="block px-4">
              {state.selectedOption || "Sr. Software Engineer"}
            </span>
            <FaCaretDown className="text-[#1768D0] mr-4" />
          </div>
          {state.isOpen && (
            <ul
              className="absolute z-10 mt-14 w-full bg-white border border-gray-300 rounded-md shadow-lg left-0 max-h-60 overflow-y-auto animate-slide-down"
              role="menu"
            >
              {["Sr. Software Eng", "Software Eng", "Software Eng 2"].map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 cursor-pointer text-sm hover:bg-[#1768D0] hover:text-white dark:text-black"
                  onClick={() => handleSelect("selectedOption", option)}
                  role="menuitem"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Joining Date */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleState("showDatePicker");
          }}
          className="relative w-full border border-gray-300 rounded-lg px-4 pt-4 pb-5 cursor-pointer flex flex-col justify-between date-picker-container"
        >
          <Label
            htmlFor="joining-date"
            className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white dark:bg-darkPrimaryBg dark:text-white"
          >
            Joining Date
          </Label>
          <div className="flex items-center justify-between">
            <span>
              {state.selectedDate
                ? state.selectedDate.toLocaleDateString()
                : "Select Joining Date"}
            </span>
            <FaCalendarAlt />
          </div>

          {state.showDatePicker && (
            <div
              className="absolute z-20 left-0 mt-14 w-auto p-4 bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto animate-slide-down dark:text-black"
              onClick={(e) => e.stopPropagation()}
            >
              <DayPicker
                mode="single"
                selected={state.selectedDate}
                onSelect={handleDateSelect}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeProfileDetails;
