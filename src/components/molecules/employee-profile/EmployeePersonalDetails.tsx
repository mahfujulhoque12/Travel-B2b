"use client";
import CardTitle from "@/components/atoms/CardTitle";
import { Input } from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const EmployeePersonalDetails = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (): void => setIsOpen(!isOpen);
  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);

  const handleSelect = (option: string): void => {
    setSelectedOption(option);
    setIsOpen(false);
    console.log(`Selected option: ${option}`); // Replace with your logic
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <CardTitle className="text-[#243045] font-semibold font-lg dark:text-white">
        Personal
      </CardTitle>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* first name */}
        <div className="relative w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <Label
            htmlFor="booking-date"
            className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white dark:text-white dark:bg-darkPrimaryBg"
          >
            First Name
          </Label>
          <Input
            type="text"
            id="first-name"
            placeholder="Md Mahfujul"
            className="font-normal lg:text-base text-gray-900 placeholder:text-black dark:placeholder:text-white"
          />
        </div>

        {/* last name */}
        <div className="relative w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <Label
            htmlFor="booking-date"
            className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white dark:text-white dark:bg-darkPrimaryBg"
          >
            Last Name
          </Label>
          <Input
            type="text"
            id="last-name"
            placeholder="Hoque"
            className="font-normal lg:text-base text-gray-900 placeholder:text-black dark:placeholder:text-white"
          />
        </div>
      </div>

      {/* sec div */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Date of birth */}
        <div
          ref={datePickerRef}
          onClick={toggleDatePicker}
          className="relative w-full border border-gray-300 rounded-lg px-4 pt-4 pb-5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 cursor-pointer flex flex-col justify-between"
        >
          <Label
            htmlFor="booking-date"
            className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white dark:text-white dark:bg-darkPrimaryBg"
          >
            Date Of Birth
          </Label>
          <div className="flex items-center justify-between">
            <span className="block text-gray-900 font-normal dark:text-white">
              {selectedDate ? selectedDate.toLocaleDateString() : "13.12.2002"}
            </span>
            <FaCalendarAlt />
          </div>

          {showDatePicker && (
            <div
              className="absolute z-20 left-0 mt-14 w-auto p-4 bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto animate-slide-down"
              onClick={(e) => e.stopPropagation()}
            >
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setShowDatePicker(false);
                }}
                footer={
                  selectedDate
                    ? `Selected: ${selectedDate.toLocaleDateString()}`
                    : "Pick a day."
                }
              />
            </div>
          )}
        </div>

        {/* Gender */}
        <div
          ref={dropdownRef}
          className="relative w-full border shadow-sm ease-in-out border-gray-300 rounded-lg px-4 pt-4 pb-5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 cursor-pointer flex flex-col justify-between"
          onClick={toggleDropdown}
        >
          <Label
            htmlFor="instant-select"
            className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white dark:text-white dark:bg-darkPrimaryBg"
          >
            Gender
          </Label>
          <div className="w-full flex items-center justify-between">
            <span className="block px-4">{selectedOption || "Select"}</span>
            <FaCaretDown className="text-[#1768D0] mr-4" />
          </div>
          {isOpen && (
            <ul
              className="absolute z-10 mt-14 w-full bg-white border border-gray-300 rounded-md shadow-lg left-0 max-h-60 overflow-y-auto animate-slide-down"
              role="menu"
            >
              <li
                className="px-4 py-2 cursor-pointer text-sm hover:bg-[#1768D0] hover:text-white transition-all duration-300 dark:text-black"
                onClick={() => handleSelect("Male")}
                role="menuitem"
              >
                Male
              </li>
              <li
                className="px-4 py-2 cursor-pointer text-sm hover:bg-[#1768D0] hover:text-white transition-all duration-300 dark:text-black"
                onClick={() => handleSelect("Female")}
                role="menuitem"
              >
                Female
              </li>
              <li
                className="px-4 py-2 cursor-pointer text-sm hover:bg-[#1768D0] hover:text-white transition-all duration-300 dark:text-black"
                onClick={() => handleSelect("Others")}
                role="menuitem"
              >
                Others
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeePersonalDetails;
