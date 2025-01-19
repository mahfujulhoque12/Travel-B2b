"use client";
import { useSearchParams } from "next/navigation";
import { useGetFlights } from "@/hooks/filter/api/v1/useFetchData";
import { useFilter } from "@/hooks/filter/useFilter";
import TimeRemaining from "@/components/molecules/flight-list/TimeRemaining";
import PriceFilter from "@/components/molecules/global/PriceFilter";
import FlightsCard from "@/components/molecules/flight-list/FlightsCard";
import AirlinesNameFilter from "@/components/molecules/flight-list/AirlinesNameFilter";
import FlightSortingTabs from "@/components/molecules/flight-list/FlightSorting";
import FlightType from "@/components/molecules/flight-list/FlighType";
import CardTitle from "@/components/atoms/CardTitle";
import Refundability from "@/components/molecules/flight-list/Refundability";
import LayoverAirportFilter from "@/components/molecules/flight-list/LayoverAirportFilter";
import BaggagePolicy from "@/components/molecules/flight-list/BaggagePolicy";
import React from "react";
import FlightSearchForOneWayForm from "../search/FlightSearchForOneWayForm";
import FlightSearchForRoundTripForm from "../search/FlightSearchForRoundTripForm";
import FlightSearchForMultipleCityForm from "../search/FlightSearchForMultipleCityForm";

const Flights = ({
  terminals,
}: {
  terminals: { city: string; airport: string; iataCode: string }[];
}) => {
  const searchParams = useSearchParams();
  const roundTrip = searchParams.get("flightType");

  const { flights } = useGetFlights();
  const {
    minPrice,
    maxPrice,
    priceRangeValues,
    setPriceRangeValues,
    filteredFlights,
    airlineNames,
    selectedAirlines,
    handleAirlineSelect,
    handleSortChange,
    sortOption,
    cheapestPrice,
    earliestTime,
    fastestDuration,
    selectedFlightType,
    handleFlightTypeChange,
    selectedRefundType,
    handleRefundTypeChange,
  } = useFilter(flights);

  const modifySearchResults = () => {
    switch (roundTrip) {
      case "one-way":
        return (
          <FlightSearchForOneWayForm
            terminals={terminals}
            isModifySearch={true}
          />
        );
      case "round-trip":
        return (
          <FlightSearchForRoundTripForm
            terminals={terminals}
            isModifySearch={true}
          />
        );
      case "multi-city":
        return (
          <FlightSearchForMultipleCityForm
            terminals={terminals}
            isModifySearch={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="px-3 py-4 shadow-light-shadow">
        {modifySearchResults()}
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="basis-full sm:basis-[25%] space-y-4">
          <TimeRemaining />
          <PriceFilter
            value={priceRangeValues}
            onValueChange={setPriceRangeValues}
            min={minPrice ?? 0}
            max={maxPrice ?? 0}
          />
          <AirlinesNameFilter
            airlineNames={airlineNames}
            selectedAirlines={selectedAirlines}
            onAirlineSelect={handleAirlineSelect}
          />
          <FlightType
            selectedType={selectedFlightType}
            onTypeChange={handleFlightTypeChange}
          />
          <Refundability
            selectedType={selectedRefundType}
            onTypeChange={handleRefundTypeChange}
          />
          <LayoverAirportFilter
            airlineNames={airlineNames}
            selectedAirlines={selectedAirlines}
            onAirlineSelect={handleAirlineSelect}
          />
          <BaggagePolicy
            airlineNames={airlineNames}
            selectedAirlines={selectedAirlines}
            onAirlineSelect={handleAirlineSelect}
          />
        </div>
        <div className="basis-full sm:basis-[85%] flex flex-col space-y-4">
          <CardTitle className="text-lg font-semibold">
            {filteredFlights.length} Flights are Available
          </CardTitle>
          <FlightSortingTabs
            selectedOption={sortOption}
            onSortChange={handleSortChange}
            dynamicValues={{
              cheapestPrice,
              earliestTime,
              fastestDuration,
            }}
          />
          <FlightsCard flights={filteredFlights} />
        </div>
      </div>
    </div>
  );
};

export default Flights;
