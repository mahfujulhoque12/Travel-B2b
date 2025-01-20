import React, { useState } from "react";
import RangeSlider from "@/components/atoms/RangeSlider";
import CardTitle from "@/components/atoms/CardTitle";
import Paragraph from "@/components/atoms/Paragraph";
import { PriceRangeIcon } from "@/components/atoms";
import { Button } from "@/components/atoms/Button";
import { ChevronDown } from "lucide-react";

interface PriceFilterProps {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  min: number;
  max: number;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  value,
  onValueChange,
  min,
  max,
}) => {
  const [isHideElement, isSetHideElement] = useState<boolean>(true);

  const hideFilterInfo = () => {
    isSetHideElement((prev) => !prev);
  };

  return (
    <div className="space-y-7 bg-[#FFFFFF] shadow-light-shadow rounded-md">
      <div
        className={`flex items-center justify-between px-3 py-3 ${
          isHideElement && "border-b"
        }`}
      >
        <div className="flex items-center gap-2">
          <PriceRangeIcon />
          <CardTitle className="text-sm text-black font-semibold">
            Price Range
          </CardTitle>
        </div>
        <div className=" flex items-center">
          <Button onClick={hideFilterInfo}>
            <ChevronDown
              className={`${isHideElement ? "rotate-180" : "rotate-0"}`}
            />
          </Button>
        </div>
      </div>
      {isHideElement && (
        <div className="px-4 py-3 space-y-12">
          <Paragraph className="text-[#8391A1] text-[14px] font-semibold leading-[16.8px]">
            Starts from $ {min} - $ {max}.
          </Paragraph>
          <RangeSlider
            value={value}
            onValueChange={onValueChange}
            min={min}
            max={max}
          />
          <div className="text-center">
            <span className="font-semibold text-[16px] leading-[16.8px] text-[#243045]">
              USD {value[0]} - USD {value[1]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
