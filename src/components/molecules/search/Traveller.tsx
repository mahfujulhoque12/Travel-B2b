import React, { useState, useRef, useEffect } from "react";
import { UserRound, Plus, Minus } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";

interface TravellerProps {
  onChange?: (data: {
    adults: number;
    children: number;
    kids: number;
    infants: number;
  }) => void;
}

const Traveller: React.FC<TravellerProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [kids, setKids] = useState(0);
  const [infants, setInfants] = useState(0);

  const totalTravelers = adults + children + kids + infants;

  const travelerPopoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!travelerPopoverRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange({ adults, children, kids, infants });
    }
  }, [adults, children, kids, infants, onChange]);

  const increment = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    if (totalTravelers < 8) {
      setter((prev) => prev + 1);
    }
  };

  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="relative" ref={travelerPopoverRef}>
      <Button
        type="button"
        className="bg-[#F3F5FF] px-2 py-1 rounded-[4px]"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle popover visibility
      >
        <UserRound className="w-4 h-4 text-blue-500" />
        <Span className="text-[14px] leading-[19.6px] font-semibold gradient-text">
          Traveler {adults + children + kids + infants} {/* Total travelers */}
        </Span>
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[320px] bg-white shadow-lg border rounded-md p-4 z-10">
          {/* Traveler Options */}
          <div className="space-y-4">
            {/* Adult Option */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserRound className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Adults</p>
                  <p className="text-xs text-gray-500">12 years & above</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-400"
                  onClick={() => decrement(setAdults)}
                >
                  <Minus className="w-4 h-4 text-blue-500" />
                </button>
                <Span className="text-sm font-medium">{adults}</Span>
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-400"
                  onClick={() => increment(setAdults)}
                  disabled={totalTravelers >= 8}
                >
                  <Plus
                    className={`w-4 h-4 ${
                      totalTravelers >= 8 ? "text-gray-400" : "text-blue-500"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserRound className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Children
                  </p>
                  <p className="text-xs text-gray-500">From 5 to under 12</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-400"
                  onClick={() => decrement(setChildren)}
                >
                  <Minus className="w-4 h-4 text-blue-500" />
                </button>
                <Span className="text-sm font-medium">{children}</Span>
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-400"
                  onClick={() => increment(setChildren)}
                  disabled={totalTravelers >= 8}
                >
                  <Plus
                    className={`w-4 h-4 ${
                      totalTravelers >= 8 ? "text-gray-400" : "text-blue-500"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserRound className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Kids</p>
                  <p className="text-xs text-gray-500">From 2 to under 5</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-400"
                  onClick={() => decrement(setKids)}
                >
                  <Minus className="w-4 h-4 text-blue-500" />
                </button>
                <Span className="text-sm font-medium">{kids}</Span>
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-400"
                  onClick={() => increment(setKids)}
                  disabled={totalTravelers >= 8}
                >
                  <Plus
                    className={`w-4 h-4 ${
                      totalTravelers >= 8 ? "text-gray-400" : "text-blue-500"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserRound className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Infants</p>
                  <p className="text-xs text-gray-500">Under 2 years</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-400"
                  onClick={() => decrement(setInfants)}
                >
                  <Minus className="w-4 h-4 text-blue-500" />
                </button>
                <Span className="text-sm font-medium">{infants}</Span>
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-400"
                  onClick={() => increment(setInfants)}
                  disabled={totalTravelers >= 8}
                >
                  <Plus
                    className={`w-4 h-4 ${
                      totalTravelers >= 8 ? "text-gray-400" : "text-blue-500"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="w-full py-2 text-sm font-semibold text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50"
              onClick={() => setIsOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Traveller;
