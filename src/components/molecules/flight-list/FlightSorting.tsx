import React from "react";

interface SortOption {
  label: string;
  value: string;
  dynamicValue?: string;
}

interface FlightSortingTabsProps {
  selectedOption: string;
  onSortChange: (value: string) => void;
  dynamicValues: {
    cheapestPrice: number | null;
    earliestTime: string | null;
    fastestDuration: string | null;
  };
}

const FlightSortingTabs: React.FC<FlightSortingTabsProps> = ({
  selectedOption,
  onSortChange,
  dynamicValues,
}) => {
  const sortOptions: SortOption[] = [
    {
      label: "Cheapest",
      value: "cheapest",
      dynamicValue: dynamicValues.cheapestPrice
        ? `$${dynamicValues.cheapestPrice.toFixed(2)}`
        : undefined,
    },
    {
      label: "Earliest",
      value: "earliest",
      dynamicValue: dynamicValues.earliestTime || undefined,
    },
    {
      label: "Fastest",
      value: "fastest",
      dynamicValue: dynamicValues.fastestDuration || undefined,
    },
  ];

  return (
    <div className="flex flex-wrap gap-1.5 overflow-hidden">
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`flex flex-1 rounded-md items-center justify-between px-4 py-3 text-sm font-medium ${
            selectedOption === option.value
              ? "bg-[#1571E7] text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          <div className="w-full flex flex-row justify-between items-center">
            <span>{option.label}</span>
            {option.dynamicValue && (
              <span className="text-xs font-medium">{option.dynamicValue}</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default FlightSortingTabs;
