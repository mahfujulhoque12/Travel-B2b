import React from "react";
import { cn } from "@/lib/utils";

interface TripTypeOption {
  label: string;
  value: string;
}

interface TripTypeSelectorProps {
  tripOptions: TripTypeOption[];
  selectedTrip: string;
  handleSelection: (value: string) => void;
}

const TripTypeSelector: React.FC<TripTypeSelectorProps> = ({
  tripOptions,
  selectedTrip,
  handleSelection,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tripOptions.map((option) => (
        <div
          key={option.value}
          className={cn(
            "flex gap-1 px-2 items-center cursor-pointer rounded-sm select-none",
            selectedTrip === option.value ? "bg-[#F4F7FE]" : "bg-gray-100"
          )}
          onClick={() => handleSelection(option.value)}
        >
          <input
            type="radio"
            id={option.value}
            name="trip-type"
            value={option.value}
            checked={selectedTrip === option.value}
            onChange={() => handleSelection(option.value)}
            className="w-3.5 h-3.5"
          />
          <label
            htmlFor={option.value}
            className={`cursor-pointer py-1.5 font-semibold text-sm ${
              selectedTrip === option.value ? "gradient-text" : "text-[#7C7C7C]"
            }`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TripTypeSelector;
