"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import FlightSearchInput from "./FlightSearchInput";
import DatePicker from "../global/DatePickerSingle";
import Traveller from "./Traveller";

import { Button } from "@/components/atoms/Button";
import TimerPicker from "./TimePicker";
import {
  TakeOffFromIcon,
  TaxiIcon,
  CalenderLabelIcon,
  PickupIcon,
} from "@/components/atoms";

// Define the form data structure
interface FormData {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  kids: number;
  infants: number;
}
interface Props {
  terminals: { city: string; airport: string }[];
}
const CarSearchForm = ({ terminals }: Props) => {
  const router = useRouter();

  // State to manage all form inputs
  const [formData, setFormData] = useState<FormData>({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    adults: 1,
    children: 0,
    kids: 0,
    infants: 0,
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

  // Update date
  const handleDepartureDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      departureDate: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  // Update date
  const handleReturnDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      returnDate: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  const handleLocationChange = useCallback(
    (key: "from" | "to") => (value: { city: string; airport: string }) => {
      setFormData((prev) => ({
        ...prev,
        [key]: `${value.city}, ${value.airport}`,
      }));
    },
    []
  );

  const handleTimeSelect = (time: string) => {
    console.log("Selected Time:", time);
  };
  // Handle form submission
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Construct query string from formData
    const queryParams = new URLSearchParams({
      from: formData.from,
      to: formData.to,
      departureDate: formData.departureDate,
      retunDate: formData.returnDate,
      adults: formData.adults.toString(),
      children: formData.children.toString(),
      kids: formData.kids.toString(),
      infants: formData.infants.toString(),
    });

    // Navigate to the search page with the query parameters
    router.push(`/search?${queryParams.toString()}`);
  };

  console.log("hello");
  return (
    <div className="space-y-6">
      <form
        onSubmit={handleFormSubmit}
        className="relative flex flex-col space-y-5"
      >
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {/* Location Inputs */}
          <FlightSearchInput
            name="from"
            title="From"
            onChange={handleLocationChange("from")}
            icon={<TakeOffFromIcon />}
            terminals={terminals}
            defaultItem={0}
          />
          <FlightSearchInput
            name="to"
            title="To"
            onChange={handleLocationChange("to")}
            icon={<TaxiIcon />}
            terminals={terminals}
            defaultItem={1}
          />

          <DatePicker
            onChange={handleDepartureDateChange}
            label="Departure"
            icon={<CalenderLabelIcon />}
          />
          <DatePicker
            onChange={handleReturnDateChange}
            label="Return"
            icon={<CalenderLabelIcon />}
          />
          <TimerPicker
            onTimeSelect={handleTimeSelect}
            label="Pickup-Time"
            icon={<PickupIcon />}
          />
          <TimerPicker
            onTimeSelect={handleTimeSelect}
            label="Drop-time"
            icon={<PickupIcon />}
          />
        </div>

        <div className="flex gap-2">
          {/* Traveler Options */}
          <Traveller onChange={handleTravellerChange} />
        </div>
        {/* Submit Button */}
        <div className="absolute bottom-[-43px] right-0 z-10">
          <Button
            type="submit"
            className="mt-4 px-12 py-2 bg-blue-gradient text-white rounded-md text-xl"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CarSearchForm;
