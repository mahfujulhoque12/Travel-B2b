import React, { useState, useCallback } from "react";
import { Plus, X } from "lucide-react";
import FlightSearchInput from "./FlightSearchInput";
import DatePicker from "../global/DatePickerSingle";
import Traveller from "./Traveller";
import TravelClassOptions from "./TravelClassOptions";
import { Button } from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  TakeOffFromIcon,
  TakeOffToIcon,
  CalenderLabelIcon,
} from "@/components/atoms";

interface CitySegment {
  id: string;
  from: { city: string; airport: string };
  to: { city: string; airport: string };
  departureDate: string;
}

interface FormData {
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
const MAX_ADDITIONAL_CITIES = 3;

const FlightSearchForMultipleCityForm = ({
  terminals,
  isModifySearch,
}: Props) => {
  const router = useRouter();
  // State to manage city segments
  const [citySegments, setCitySegments] = useState<CitySegment[]>([
    {
      id: "initial-1",
      from: { city: "", airport: "" },
      to: { city: "", airport: "" },
      departureDate: "",
    },
    {
      id: "initial-2",
      from: { city: "", airport: "" },
      to: { city: "", airport: "" },
      departureDate: "",
    },
  ]);

  // State for traveller and travel class options
  const [formData, setFormData] = useState<FormData>({
    adults: 1,
    children: 0,
    kids: 0,
    infants: 0,
    travelClass: "economy",
  });

  // Add new city segment
  const handleAddCity = () => {
    if (citySegments.length < 2 + MAX_ADDITIONAL_CITIES) {
      setCitySegments((prev) => [
        ...prev,
        {
          id: `city-${Date.now()}`,
          from: { city: "", airport: "" },
          to: { city: "", airport: "" },
          departureDate: "",
        },
      ]);
    }
  };

  // Remove city segment
  const handleRemoveCity = (id: string) => {
    setCitySegments((prev) =>
      prev.filter((segment) => !id.startsWith("initial") && segment.id !== id)
    );
  };

  // Update city segment data
  const handleUpdateCitySegment = (
    id: string,
    key: keyof CitySegment,
    value: CitySegment["from"] | CitySegment["to"] | string | undefined
  ) => {
    setCitySegments((prev) =>
      prev.map((segment) =>
        segment.id === id ? { ...segment, [key]: value } : segment
      )
    );
  };

  // Update traveller details
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
    []
  );

  // Update travel class
  const handleTravelClassSelect = (selectedClass: string) => {
    setFormData((prev) => ({
      ...prev,
      travelClass: selectedClass,
    }));
  };

  // Form submission handler
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Construct query parameters for submission
    const queryParams = new URLSearchParams();

    citySegments.forEach((segment, index) => {
      queryParams.append(
        `from-${index}`,
        `${segment.from.city}, ${segment.from.airport}`
      );
      queryParams.append(
        `to-${index}`,
        `${segment.to.city}, ${segment.to.airport}`
      );
      queryParams.append(`departureDate-${index}`, segment.departureDate);
    });

    queryParams.append("adults", formData.adults.toString());
    queryParams.append("children", formData.children.toString());
    queryParams.append("kids", formData.kids.toString());
    queryParams.append("infants", formData.infants.toString());
    queryParams.append("travelClass", formData.travelClass);
    queryParams.append("flightType", "multi-city");

    // Navigate to the search page with the query parameters
    router.push(`/flight-list?${queryParams.toString()}`);
  };

  return (
    <div className="space-y-6">
      <form
        className="relative flex flex-col space-y-5"
        onSubmit={handleFormSubmit}
      >
        {/* Render city segments */}
        {citySegments.map((segment, index) => (
          <div
            key={segment.id}
            className="relative w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-2"
          >
            {/* Location Inputs */}
            <FlightSearchInput
              name={`from-${segment.id}`}
              title="From"
              icon={<TakeOffFromIcon />}
              onChange={(value) =>
                handleUpdateCitySegment(segment.id, "from", value)
              }
              terminals={terminals}
              defaultItem={0}
            />
            <FlightSearchInput
              name={`to-${segment.id}`}
              title="To"
              icon={<TakeOffToIcon />}
              onChange={(value) =>
                handleUpdateCitySegment(segment.id, "to", value)
              }
              terminals={terminals}
              defaultItem={1}
            />
            {/* Date Picker */}
            <DatePicker
              onChange={(date) =>
                handleUpdateCitySegment(
                  segment.id,
                  "departureDate",
                  date ? date.toISOString().split("T")[0] : ""
                )
              }
              label="Departure"
              icon={<CalenderLabelIcon />}
            />

            {/* Remove Button */}
            {index >= 2 && (
              <div className="flex items-center absolute left-full top-1/2 transform -translate-y-1/2">
                <Button
                  type="button"
                  onClick={() => handleRemoveCity(segment.id)}
                  className="bg-blue-gradient text-white rounded-full p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
        <div className="flex gap-2">
          {/* Traveler Options */}
          <Traveller onChange={handleTravellerChange} />
          {/* Travel Class Options */}
          <TravelClassOptions onSelect={handleTravelClassSelect} />
        </div>
        {/* Add More Flight Button */}
        {citySegments.length < 2 + MAX_ADDITIONAL_CITIES && (
          <div>
            <Button
              type="button"
              className="gradient-text text-sm font-semibold border border-blue-400 px-3 py-2"
              onClick={handleAddCity}
            >
              <Plus className="text-blue-500 w-5 h-5" /> Add More Flight
            </Button>
          </div>
        )}
        {/* Submit Button */}
        <div className="absolute bottom-[-43px] right-0 z-10">
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

export default FlightSearchForMultipleCityForm;
