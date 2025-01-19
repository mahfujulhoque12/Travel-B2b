import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import FlightSearchInput from "./FlightSearchInput";
import DatePicker from "../global/DatePickerSingle";
import Traveller from "./Traveller";
import TravelClassOptions from "./TravelClassOptions";
import { Button } from "@/components/atoms/Button";
import {
  TakeOffFromIcon,
  TakeOffToIcon,
  CalenderLabelIcon,
} from "@/components/atoms";
import { cn } from "@/lib/utils";

interface FormData {
  from: string;
  to: string;
  date: string;
  adults: number;
  children: number;
  kids: number;
  infants: number;
  travelClass: string;
}

interface Props {
  terminals: { city: string; airport: string }[];
  isModifySearch?: boolean;
}
const FlightSearchForOneWayForm = ({ terminals, isModifySearch }: Props) => {
  const router = useRouter();

  // State to manage all form inputs
  const [formData, setFormData] = useState<FormData>({
    from: "",
    to: "",
    date: "",
    adults: 1,
    children: 0,
    kids: 0,
    infants: 0,
    travelClass: "economy",
  });

  const handleTravellerChange = useCallback(
    (data: {
      adults: number;
      children: number;
      kids: number;
      infants: number;
    }) => {
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
    },
    [] // Dependencies of useCallback, add formData only if necessary
  );

  // Update travel class
  const handleTravelClassSelect = (selectedClass: string) => {
    setFormData((prev) => ({
      ...prev,
      travelClass: selectedClass,
    }));
  };

  // Update date
  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      date: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  // Update location (from/to)
  const handleLocationChange = useCallback(
    (key: "from" | "to") => (value: { city: string; airport: string }) => {
      setFormData((prev) => ({
        ...prev,
        [key]: `${value.city}, ${value.airport}`,
      }));
    },
    []
  );
  // Handle form submission
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate required fields before submission
    if (!formData.from || !formData.to || !formData.date) {
      alert("Please fill out all required fields.");
      return;
    }

    if (isModifySearch) {
      console.log(formData);
    } else {
      // Construct query string from formData
      const queryParams = new URLSearchParams({
        from: formData.from,
        to: formData.to,
        departureDate: formData.date,
        adults: formData.adults.toString(),
        children: formData.children.toString(),
        kids: formData.kids.toString(),
        infants: formData.infants.toString(),
        travelClass: formData.travelClass,
        flightType: "one-way",
      });

      // Navigate to the search page with the query parameters
      router.push(`/flight-list?${queryParams.toString()}`);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleFormSubmit}
        className="relative flex flex-col space-y-5"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-2">
          {/* Location Inputs */}
          <FlightSearchInput
            name="from"
            title="From"
            icon={<TakeOffFromIcon />}
            onChange={handleLocationChange("from")}
            terminals={terminals}
            defaultItem={0}
          />
          <FlightSearchInput
            name="to"
            title="To"
            icon={<TakeOffToIcon />}
            onChange={handleLocationChange("to")}
            terminals={terminals}
            defaultItem={1}
          />
          {/* Date Picker */}
          <DatePicker
            onChange={handleDateChange}
            label="Departure"
            icon={<CalenderLabelIcon />}
          />
        </div>
        <div className="flex gap-2">
          {/* Traveler Options */}
          <Traveller onChange={handleTravellerChange} />
          {/* Travel Class Options */}
          <TravelClassOptions onSelect={handleTravelClassSelect} />
        </div>
        {/* Submit Button */}
        <div className="absolute bottom-[-43px] right-0">
          <Button
            type="submit"
            className={cn(
              "mt-4 py-2 bg-blue-gradient text-white rounded-md",
              isModifySearch
                ? "bg-spring-awakening px-5 text-base"
                : "px-12 bg-blue-gradient text-xl"
            )}
          >
            {isModifySearch ? "Modify" : "Search"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FlightSearchForOneWayForm;
