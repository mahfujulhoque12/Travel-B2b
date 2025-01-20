import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import SearchInputs from "./FlightSearchInput";
import DatePicker from "../global/DatePickerSingle";
import Traveller from "./Traveller";
import TravelClassOptions from "./TravelClassOptions";
import { Button } from "@/components/atoms/Button";
import { TakeOffFromIcon, CalenderLabelIcon } from "@/components/atoms";

// Define the form data structure
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
}
const HotelBookingSearchForm = ({ terminals }: Props) => {
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

    // Construct query string from formData
    const queryParams = new URLSearchParams({
      from: formData.from,
      to: formData.to,
      date: formData.date,
      adults: formData.adults.toString(),
      children: formData.children.toString(),
      kids: formData.kids.toString(),
      infants: formData.infants.toString(),
      travelClass: formData.travelClass,
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
        <div className="w-full flex flex-col sm:flex-row gap-2">
          {/* Location Inputs */}
          <SearchInputs
            name="city"
            title="City"
            icon={<TakeOffFromIcon />}
            onChange={handleLocationChange("from")}
            terminals={terminals}
            defaultItem={0}
          />
          {/* Date Picker */}
          <DatePicker
            onChange={handleDateChange}
            label="Check-In"
            icon={<CalenderLabelIcon />}
          />
          <DatePicker
            onChange={handleDateChange}
            label="Check-Out"
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

export default HotelBookingSearchForm;
