import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import { cn } from "@/lib/utils";
import React from "react";

interface NavigationItem {
  label: string;
  duration?: string;
  isActive: boolean;
}

interface NavigationTabProps {
  items: NavigationItem[];
  onTabClick: (label: string) => void;
}

const NavigationTab: React.FC<NavigationTabProps> = ({ items, onTabClick }) => {
  console.log(items);
  return (
    <div className={`flex`}>
      {items.map((item, index) => (
        <Button
          key={index}
          onClick={() => onTabClick(item.label)}
          className={cn(
            "flex justify-between w-full font-normal px-5 py-3",
            item.isActive ? "bg-blue-600 text-white" : "bg-white text-gray-700",
            index === 0 && "rounded-l-md",
            index === items.length - 1 && "rounded-r-md"
          )}
        >
          <Span className="text-sm font-semibold">{item.label}</Span>
          <Span className="text-sm font-semibold">{item.duration}</Span>
        </Button>
      ))}
    </div>
  );
};

export default NavigationTab;
