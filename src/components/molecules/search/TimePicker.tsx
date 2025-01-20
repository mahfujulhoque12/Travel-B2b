import Span from "@/components/atoms/Span";
import { useState, useRef, useEffect, useCallback } from "react";
import CardDescription from "@/components/atoms/CardDescription";
import CardTitle from "@/components/atoms/CardTitle";
import { cn } from "@/lib/utils";

interface TimerPickerProps {
  onTimeSelect?: (selectedTime: string) => void;
  label?: string;
  icon: React.ReactNode;
}

const TimerPicker: React.FC<TimerPickerProps> = ({
  onTimeSelect,
  label,
  icon,
}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Get the current time
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const initialPeriod = currentHour >= 12 ? "PM" : "AM";

  // Convert current hour to 12-hour format
  const initialHour = currentHour % 12 || 12;

  // State variables initialized with the current time
  const [hour, setHour] = useState<number>(initialHour);
  const [minute, setMinute] = useState<number>(currentMinute);
  const [period, setPeriod] = useState<"AM" | "PM">(initialPeriod);
  const [openDropdown, setOpenDropdown] = useState<
    "hour" | "minute" | "period" | null
  >(null);

  const timePickerRef = useRef<HTMLDivElement | null>(null); // For the time picker container
  const dropdownRef = useRef<HTMLDivElement | null>(null); // For the dropdown menus

  const toggleTimePicker = () => {
    setShowTimePicker((prev) => !prev);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      timePickerRef.current &&
      !timePickerRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowTimePicker(false); // Close time picker
      setOpenDropdown(null); // Close dropdown
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const toggleDropdown = (type: "hour" | "minute" | "period") => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  };

  const hours = Array.from({ length: 12 }, (_, i) => i + 1); // 1 to 12
  const minutes = Array.from({ length: 60 }, (_, i) => i); // 0 to 59

  // Notify parent component when the time is selected
  useEffect(() => {
    if (onTimeSelect) {
      const selectedTime = `${hour}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;
      onTimeSelect(selectedTime);
    }
  }, [hour, minute, period, onTimeSelect]);

  return (
    <div
      ref={timePickerRef}
      className={cn(
        "flex flex-col border w-full h-20 rounded-md cursor-pointer justify-center relative px-2",
        showTimePicker
          ? "border-[#1571E7] bg-white"
          : "border-[#f1f1f3] bg-[#F5F7FA]"
      )}
    >
      {/* Display Selected Time */}
      <div className="select-none pb-1" onClick={toggleTimePicker}>
        <div className="flex gap-1 items-center">
          {icon}
          <Span className="text-xs text-[#7C7C7C] font-semibold">{label}</Span>
        </div>
        <div className="transform translate-y-1">
          <CardTitle className="text-[16px] font-semibold">
            {hour}:{minute.toString().padStart(2, "0")} {period}
          </CardTitle>
          <CardDescription className="text-xs font-normal text-[#243045]">
            Tuesday 2024
          </CardDescription>
        </div>
      </div>
      {showTimePicker && (
        <div
          className="flex absolute border border-[#f3f4f6] top-full z-20 left-0 items-center"
          ref={dropdownRef}
        >
          {/* Hours Dropdown */}
          <div
            className="p-2 border-r cursor-pointer bg-[#f3f4f6] w-16 text-center relative text-sm font-normal"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown("hour");
            }}
          >
            {hour}
            {openDropdown === "hour" && (
              <div className="absolute left-0 z-10 mt-2 border bg-[#f3f4f6]  rounded-md w-16 max-h-48 overflow-y-auto">
                {hours.map((h) => (
                  <div
                    key={h}
                    className="px-2 py-1 hover:bg-white text-center cursor-pointer "
                    onClick={() => {
                      setHour(h);
                      setOpenDropdown(null);
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Minutes Dropdown */}
          <div
            className="p-2 border-r bg-[#f3f4f6] cursor-pointer w-16 text-center relative text-sm font-normal"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown("minute");
            }}
          >
            {minute.toString().padStart(2, "0")}
            {openDropdown === "minute" && (
              <div className="absolute rounded-md border left-0 z-20 mt-2 bg-[#f3f4f6] w-16 max-h-48 overflow-y-auto">
                {minutes.map((m) => (
                  <div
                    key={m}
                    className="px-2 py-1 hover:bg-white text-center cursor-pointer"
                    onClick={() => {
                      setMinute(m);
                      setOpenDropdown(null);
                    }}
                  >
                    {m.toString().padStart(2, "0")}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AM/PM Dropdown */}
          <div
            className="p-2 border-l bg-[#f3f4f6] cursor-pointer w-16 text-center relative text-sm font-normal"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown("period");
            }}
          >
            {period}
            {openDropdown === "period" && (
              <div className="absolute rounded-md border left-0 z-20 mt-2 bg-[#f3f4f6] w-16">
                {["AM", "PM"].map((p) => (
                  <div
                    key={p}
                    className="px-2 py-1 hover:bg-white text-center cursor-pointer text-sm font-normal"
                    onClick={() => {
                      setPeriod(p as "AM" | "PM");
                      setOpenDropdown(null); // Close dropdown
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerPicker;
