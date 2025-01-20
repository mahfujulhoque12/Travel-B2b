import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CitySearchInput from "./CitySearchInput";
import DatePicker from "../global/DatePickerSingle";
import { Button } from "@/components/atoms/Button";
import { Plus, X } from "lucide-react";
import { TakeOffFromIcon, CalenderLabelIcon } from "@/components/atoms";

interface CityForm {
  city: string;
  airport: string;
  date: string;
}
type CityFormFieldType = string;

interface Props {
  terminals: { city: string; airport: string }[];
}
const HolidaySearchForm = ({ terminals }: Props) => {
  const router = useRouter();

  // State to manage city inputs
  const [cities, setCities] = useState<CityForm[]>([
    { city: "", airport: "", date: "" }, // Initial city
  ]);

  // Add a new city input, max 3 cities
  const handleAddCity = () => {
    if (cities.length < 3) {
      setCities((prev) => [...prev, { city: "", airport: "", date: "" }]);
    }
  };

  // Remove a city input
  const handleRemoveCity = (index: number) => {
    setCities((prev) => prev.filter((_, i) => i !== index));
  };

  // Update city or date with explicit type for value
  const handleCityChange =
    (index: number, field: keyof CityForm) => (value: CityFormFieldType) => {
      setCities((prev) =>
        prev.map((city, i) =>
          i === index ? { ...city, [field]: value } : city
        )
      );
    };

  // Submit form
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Construct query string
    const queryParams = new URLSearchParams();
    cities.forEach((city, index) => {
      queryParams.append(`city${index + 1}`, `${city.city}, ${city.airport}`);
      queryParams.append(`date${index + 1}`, city.date);
    });

    router.push(`/search?${queryParams.toString()}`);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleFormSubmit}
        className="relative flex flex-col space-y-7"
      >
        {cities.map((city, index) => (
          <div
            key={index}
            className="w-full flex flex-col sm:flex-row gap-2 relative"
          >
            <CitySearchInput
              name={`city-${index}`}
              title={`City`}
              onChange={({ city, airport }) =>
                handleCityChange(index, "city")(`${city}, ${airport}`)
              }
              icon={<TakeOffFromIcon />}
              terminals={terminals}
              defaultItem={1}
            />
            <DatePicker
              onChange={(date) =>
                handleCityChange(
                  index,
                  "date"
                )(date ? date.toISOString().split("T")[0] : "")
              }
              label={`Departure`}
              fullWidth={true}
              icon={<CalenderLabelIcon />}
            />
            {index > 0 && (
              <div className="absolute -right-9 h-full flex items-center">
                <Button
                  type="button"
                  onClick={() => handleRemoveCity(index)}
                  className="bg-red-500 text-white rounded-full p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        ))}

        {cities.length < 3 && (
          <div>
            <Button
              type="button"
              className="gradient-text text-sm font-semibold border border-blue-400 px-3 py-2"
              onClick={handleAddCity}
            >
              <Plus className="text-blue-500 w-5 h-5" /> Add More City
            </Button>
          </div>
        )}

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

export default HolidaySearchForm;
