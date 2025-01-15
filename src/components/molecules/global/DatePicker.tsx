import React, { useState, useRef, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { Button } from "@/components/atoms/Button";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";

interface DatePickerProps {
  field: string;
  setFilter: (field: string, startDate: string, endDate: string) => void;
  defaultRange?: DateRange;
}

const DatePicker: React.FC<DatePickerProps> = ({
  field,
  setFilter,
  defaultRange,
}) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(
    defaultRange || null
  );
  const [tempRange, setTempRange] = useState<DateRange | null>(null); // Temporary range
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!datePickerRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleApply = () => {
    if (tempRange?.from && tempRange?.to) {
      setSelectedRange(tempRange);
      const start = new Date(tempRange.from).setHours(0, 0, 0, 0);
      const end = new Date(tempRange.to).setHours(23, 59, 59, 999);
      const formattedStartDate = format(new Date(start), "yy-MM-dd");
      const formattedEndDate = format(new Date(end), "yy-MM-dd");
      setFilter(field, formattedStartDate, formattedEndDate);
      setIsOpen(false);
    } else if (tempRange?.from && tempRange?.to) {
      setFilter(field, "", "");
    } else {
      alert("please select range");
    }
  };
  const clearAppliedDate = () => {
    setSelectedRange(null);
    setTempRange(null);
    setIsOpen(false);
  };

  const deSelectDate = () => {
    setSelectedRange(null);
    setTempRange(null);
  };

  const getPlaceholderText = () => {
    if (selectedRange?.from && selectedRange?.to) {
      return `${format(selectedRange.from, "MMM dd")} - ${format(
        selectedRange.to,
        "MMM dd"
      )}`;
    }
    return "Calendar";
  };

  return (
    <div
      ref={datePickerRef}
      className="relative inline-block text-left dark:text-black "
    >
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 w-full border border-[#7C7C7C] rounded-lg px-4 py-2 text-sm text-gray-700 bg-white dark:bg-darkButtonBg  focus:outline-none "
      >
        <span className="text-[#7C7C7C] dark:text-white">{getPlaceholderText()}</span>
        <FaCalendarAlt className="text-[#7C7C7C] dark:text-white"/>
      </button>

      {isOpen && (
        <>
          <div className="absolute mt-2 z-10 py-2 px-4 bg-white border border-gray-300 rounded-lg shadow-lg  animate-slide-down ">
            <DayPicker
              className=" flex items-center justify-center"
              mode="range"
              selected={tempRange || undefined}
              onSelect={(range) => setTempRange(range ?? null)}
            />
            <div className="flex gap-2 px-2 mt-3">
              {tempRange?.from && tempRange?.to ? (
                <Button
                  className="bg-[#0d0d0e] flex-1 px-3 py-1.5 rounded-md text-white text-sm font-normal"
                  onClick={deSelectDate}
                >
                  {tempRange?.from && tempRange?.to && "Deselect"}
                </Button>
              ) : (
                <Button
                  className="bg-[#0d0d0e] flex-1 px-3 py-1.5 rounded-md text-white text-sm font-normal"
                  onClick={clearAppliedDate}
                >
                  {!(tempRange?.from && tempRange?.to) && "Cancel"}
                </Button>
              )}
              <Button
                className="bg-[#1571E7] flex-1 px-3 py-1.5 rounded-md text-white text-sm font-normal"
                onClick={handleApply}
              >
                Apply
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DatePicker;
