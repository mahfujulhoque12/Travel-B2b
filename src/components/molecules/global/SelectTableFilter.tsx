import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";

interface Package {
  id: number;
  issueDate: string;
  bookingDate: string;
  bookingID: string;
  passengerName: string;
  flightDate: string;
  route: string;
  ticketNumber: string;
  totalPrice: string;
  status: string;
  actionPrimaryLabel: string;
}

interface SelectFilterProps {
  searchField: keyof Package;
  getOptions: (field: keyof Package) => string[];
  setFilter: (value: string, field: keyof Package) => void;
}

const SelectTableFilter: React.FC<SelectFilterProps> = ({
  searchField,
  getOptions,
  setFilter,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("All " + searchField);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = getOptions(searchField);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setFilter(option === `All ${searchField}` ? "" : option, searchField);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="text-sm border border-[#1768D0] text-[#1768D0] rounded-md shadow-sm py-2 px-3 bg-white w-[120px] flex items-center justify-between"
        type="button"
      >
        <span>{selectedOption}</span>
        <FaCaretDown className="ml-2 text-[#1768D0]" />
      </button>

      {isDropdownOpen && (
        <ul
          className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto animate-slide-down"
          role="menu"
        >
          <li
            className="px-4 transation-all duration-500 py-2 cursor-pointer text-sm hover:bg-[#1768D0] hover:text-white"
            onClick={() => handleOptionClick(`All ${searchField}`)}
            role="menuitem"
          >
            All {searchField}
          </li>
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-[#1768D0] hover:text-white transation-all duration-500 text-sm"
              onClick={() => handleOptionClick(option)}
              role="menuitem"
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectTableFilter;
