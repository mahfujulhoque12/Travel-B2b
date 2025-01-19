import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TravelClassOptionsProps {
  onSelect?: (value: string) => void;
}

const TravelClassOptions: React.FC<TravelClassOptionsProps> = ({
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("economy");
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!popoverRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePopover = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClassSelection = (value: string) => {
    setSelectedClass(value);
    setIsOpen(false);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      <Button
        type="button"
        className="bg-[#F3F5FF] px-2 py-1 rounded-[4px]"
        onClick={togglePopover}
      >
        <Span className="text-[14px] leading-[19.6px] font-semibold gradient-text">
          {selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)}{" "}
        </Span>
        <ChevronDown className="w-4 h-4 text-blue-500" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[200px] bg-white shadow-lg border rounded-md z-10">
          <div className="space-y-2">
            <label
              className={cn(
                "flex items-center gap-2 cursor-pointer px-3 py-2",
                selectedClass === "economy" && "bg-blue-100"
              )}
            >
              <input
                type="radio"
                name="class"
                value="economy"
                className="w-4 h-4"
                checked={selectedClass === "economy"}
                onChange={() => handleClassSelection("economy")}
              />
              <span className="text-sm font-semibold text-blue-500">
                Economy
              </span>
            </label>

            <label
              className={cn(
                "flex items-center gap-2 cursor-pointer px-3 py-2",
                selectedClass === "premium-economy" && "bg-blue-100"
              )}
            >
              <input
                type="radio"
                name="class"
                value="premium-economy"
                className="w-4 h-4"
                checked={selectedClass === "premium-economy"}
                onChange={() => handleClassSelection("premium-economy")}
              />
              <span className="text-sm text-gray-700">Premium Economy</span>
            </label>

            <label
              className={cn(
                "flex items-center gap-2 cursor-pointer px-3 py-2",
                selectedClass === "business" && "bg-blue-100"
              )}
            >
              <input
                type="radio"
                name="class"
                value="business"
                className="w-4 h-4"
                checked={selectedClass === "business"}
                onChange={() => handleClassSelection("business")}
              />
              <span className="text-sm text-gray-700">Business</span>
            </label>

            <label
              className={cn(
                "flex items-center gap-2 cursor-pointer px-3 py-2",
                selectedClass === "first-class" && "bg-blue-100"
              )}
            >
              <input
                type="radio"
                name="class"
                value="first-class"
                className="w-4 h-4"
                checked={selectedClass === "first-class"}
                onChange={() => handleClassSelection("first-class")}
              />
              <span className="text-sm text-gray-700">First Class</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelClassOptions;
