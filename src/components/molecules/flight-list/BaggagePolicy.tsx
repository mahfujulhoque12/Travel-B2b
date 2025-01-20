import React, { useState } from "react";
import CardTitle from "@/components/atoms/CardTitle";
import { Button } from "@/components/atoms/Button";
import { ChevronDown } from "lucide-react";
import Checkbox from "@/components/atoms/Checkbox";
import Label from "@/components/atoms/Label";
import Span from "@/components/atoms/Span";
import { BaggagePolicyIcon } from "@/components/atoms";

interface AirlinesNameFilterProps {
  airlineNames: { name: string; price: number }[];
  selectedAirlines: string[];
  onAirlineSelect: (name: string) => void;
}

const BaggagePolicy: React.FC<AirlinesNameFilterProps> = ({
  airlineNames,
  selectedAirlines,
  onAirlineSelect,
}) => {
  const [isHideElement, isSetHideElement] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const hideFilterInfo = () => {
    isSetHideElement((prev) => !prev);
  };

  // Calculate the number of airlines to show based on expanded state
  const displayedAirlines = isExpanded
    ? airlineNames
    : airlineNames.slice(0, 6);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="space-y-2 bg-[#FFFFFF] shadow-light-shadow rounded-md">
      <div
        className={`flex items-center justify-between px-3 py-3 ${
          isHideElement && "border-b"
        }`}
      >
        <div className="flex items-center gap-2">
          <BaggagePolicyIcon />
          <CardTitle className="text-sm text-black font-semibold">
            Baggage Policy
          </CardTitle>
        </div>
        <div className="flex items-center">
          <Button onClick={hideFilterInfo}>
            <ChevronDown
              className={`${isHideElement ? "rotate-180" : "rotate-0"}`}
            />
          </Button>
        </div>
      </div>
      {isHideElement && (
        <div className="px-4 py-3 space-y-3">
          {displayedAirlines.map((airline) => (
            <div
              key={airline.name}
              className="flex items-center justify-between px-1 py-0.5"
            >
              <Label
                htmlFor={airline.name}
                className="flex items-center gap-3 text-[14px] leading-[16px.8] font-normal text-[#243045]"
              >
                <Checkbox
                  id={airline.name}
                  checked={selectedAirlines.includes(airline.name)}
                  onChange={() => onAirlineSelect(airline.name)}
                  isRounded={false}
                />
                {airline.name.split(" ")[0]}
              </Label>
              <Span className="text-[14px] leading-[16px.8] font-normal text-[#243045]">
                ${airline.price.toFixed(2)}
              </Span>
            </div>
          ))}
          {airlineNames.length > 20 && (
            <div
              className="cursor-pointer text-blue-600 text-sm mt-2 px-1"
              onClick={handleToggle}
            >
              <Span>
                {isExpanded
                  ? "Show Less"
                  : `Show More (${airlineNames.length - 20} more)`}
              </Span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BaggagePolicy;
