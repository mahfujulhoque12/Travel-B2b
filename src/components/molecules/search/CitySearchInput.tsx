"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Span from "@/components/atoms/Span";
import { X, ChevronDown, Check } from "lucide-react";
import CardTitle from "@/components/atoms/CardTitle";
import CardDescription from "@/components/atoms/CardDescription";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

interface CitySearchInputProps {
  name: string;
  title?: string;
  onChange?: (value: { city: string; airport: string }) => void;
  icon: React.ReactNode;
  terminals: { city: string; airport: string }[];
  defaultItem: number;
}

const CitySearchInput: React.FC<CitySearchInputProps> = ({
  name,
  title,
  onChange,
  icon,
  terminals,
  defaultItem,
}) => {
  const initialTerminal = terminals[defaultItem] || { city: "", airport: "" };

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(initialTerminal.city);
  const [selectedCity, setSelectedCity] = useState(initialTerminal.city);
  const [selectedAirport, setSelectedAirport] = useState(
    initialTerminal.airport
  );
  const [filteredData, setFilteredData] = useState(terminals);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchBoxRef = useRef<HTMLInputElement | null>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!containerRef.current?.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    // If terminals change, reset filteredData
    setFilteredData(terminals);
  }, [terminals]);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      searchBoxRef.current?.focus();
    }, 200);
  };

  useEffect(() => {
    const lowerSearchValue = searchValue.toLowerCase();

    // Show all terminals if searchValue matches selectedCity and dropdown is open
    if (isOpen && searchValue === selectedCity) {
      setFilteredData(terminals);
      return;
    }

    if (searchValue) {
      setFilteredData(
        terminals.filter(
          (item) =>
            item.city.toLowerCase().includes(lowerSearchValue) ||
            item.airport.toLowerCase().includes(lowerSearchValue)
        )
      );
    } else {
      setFilteredData(terminals);
    }
  }, [searchValue, terminals, isOpen, selectedCity]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setIsOpen(true);
  };

  const handleClear = () => {
    setSearchValue("");
    setFilteredData(terminals);
    setIsOpen(false);

    // Reset to the first terminal in the list
    if (terminals.length > 0) {
      const first = terminals[0];
      setSelectedCity(first.city);
      setSelectedAirport(first.airport);
      if (onChange) onChange(first);
    } else {
      // If no terminals exist, clear out the fields
      setSelectedCity("");
      setSelectedAirport("");
      if (onChange) onChange({ city: "", airport: "" });
    }
  };

  const handleSelect = (item: { city: string; airport: string }) => {
    setSelectedCity(item.city);
    setSelectedAirport(item.airport);
    setSearchValue(item.city);
    setIsOpen(false);
    if (onChange) {
      onChange(item);
    }
  };

  // Call onChange once on mount with the default item
  // No dependencies => runs once and doesn't cause infinite loops
  useEffect(() => {
    if (onChange && initialTerminal.city && initialTerminal.airport) {
      onChange({
        city: initialTerminal.city,
        airport: initialTerminal.airport,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once on mount

  const listboxId = "flight-search-listbox";

  return (
    <div
      ref={containerRef}
      className={`flex flex-col relative border w-full h-16 rounded-md cursor-pointer transition-all duration-300 ease-in-out ${
        isOpen ? "border-[#1571E7] bg-white" : "border-[#f1f1f3] bg-[#F5F7FA]"
      }`}
      onClick={() => {
        if (!isOpen) {
          handleOpen();
        }
      }}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-owns={listboxId}
    >
      <div className="relative overflow-hidden h-full">
        <div
          className={`absolute px-2 transition-transform duration-300 ease-in-out ${
            isOpen ? "-translate-y-[80px]" : "translate-y-[4px]"
          }`}
        >
          <div className="flex gap-1 items-center mb-1">
            {icon}
            <Span className="text-xs text-[#7C7C7C] font-semibold">
              {title}
            </Span>
            <ChevronDown className="transform translate-y-[px] w-3.5 h-3.5 text-[#7C7C7C]" />
          </div>
          <div className="select-none">
            <CardTitle className="text-[16px] font-semibold">
              {selectedCity}
            </CardTitle>
            <CardDescription className="text-xs font-normal text-[#243045]">
              {selectedAirport}
            </CardDescription>
          </div>
        </div>

        <div
          className={`absolute w-full h-full transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-y-[0px]" : "translate-y-[90px]"
          }`}
        >
          <div
            className={cn(
              "h-full",
              searchValue && "flex items-center justify-between pr-2"
            )}
          >
            <Input
              name={name}
              ref={searchBoxRef}
              type="text"
              placeholder={`Search ${title} Airport`}
              className="h-full border-none focus-visible:ring-0"
              value={searchValue}
              onFocus={() => {
                if (!isOpen) handleOpen();
              }}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
            />
            {searchValue && (
              <Button
                className="hover:bg-gray-100 rounded-full p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                aria-label="Clear selection"
              >
                <X className="w-5 h-5 text-gray-500" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {isOpen && filteredData.length > 0 && (
        <div
          className="shadow-light-shadow transition-[opacity] ease-in duration-300 bg-white w-full absolute left-0 overflow-y-scroll h-fit top-full mt-1 z-20 border rounded-md border-[#1571E7]"
          role="listbox"
          id={listboxId}
        >
          {filteredData.map((d, index) => {
            const isSelected =
              selectedCity === d.city && selectedAirport === d.airport;
            return (
              <div
                key={index}
                className={`flex flex-row justify-between hover:bg-[#e8f0fe] cursor-pointer px-3.5 py-3 ${
                  isSelected
                    ? "bg-blue-gradient hover:bg-blue-gradient text-white"
                    : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(d);
                }}
                role="option"
                aria-selected={isSelected}
              >
                <div>
                  <CardTitle className="text-sm font-semibold">
                    {d.city}
                  </CardTitle>
                  <CardDescription
                    className={`text-xs font-normal ${
                      isSelected ? "text-white" : "text-[#243045]"
                    }`}
                  >
                    {d.airport}
                  </CardDescription>
                </div>
                {isSelected && (
                  <div className="flex items-center">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CitySearchInput;
