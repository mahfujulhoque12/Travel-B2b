import { useEffect, useState, useMemo } from "react";
import { Flight } from "@/types/api";
import { parse } from "date-fns";
interface Package {
  id: number;
  issueDate: string;
  bookingDate: string;
  bookingID: string;
  passengerName: string;
  flightDate: string;
  route: string;
  ticketNumber: string;
  totalPrice: string;
  status: string;
  actionPrimaryLabel: string;
}

export function useFlightBookingFilter(flightBookingTable: Package[]) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Separate state for select filters and date range filters
  const [selectFilters, setSelectFilters] = useState<Record<string, string>>(
    {}
  );
  const [dateRangeFilters, setDateRangeFilters] = useState<
    Record<string, { startDate: string; endDate: string }>
  >({});

  const filteredTableData = useMemo(() => {
    let filteredData = flightBookingTable;

    // Apply search query filter
    if (searchQuery.trim()) {
      const lowerCasedQuery = searchQuery.toLowerCase();
      filteredData = filteredData.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(lowerCasedQuery)
        )
      );
    }

    // Apply select filters
    Object.entries(selectFilters).forEach(([field, value]) => {
      if (value) {
        filteredData = filteredData.filter(
          (item) =>
            item[field as keyof Package]?.toString().toLowerCase() ===
            value.toLowerCase()
        );
      }
    });

    Object.entries(dateRangeFilters).forEach(
      ([field, { startDate, endDate }]) => {
        if (field) {
          console.log(field);
          filteredData = filteredData.filter((item) => {
            // Parse item date and normalize
            const itemDate = new Date(
              item[field as keyof Package]?.toString()
            ).setHours(0, 0, 0, 0);

            // Parse startDate and endDate with custom format
            const start = parse(startDate, "yy-MM-dd", new Date()).setHours(
              0,
              0,
              0,
              0
            );
            const end = parse(endDate, "yy-MM-dd", new Date()).setHours(
              23,
              59,
              59,
              999
            );

            return itemDate >= start && itemDate <= end;
          });
        }
      }
    );

    return filteredData;
  }, [searchQuery, selectFilters, dateRangeFilters, flightBookingTable]);

  // Functions for setting filters
  const setSelectFilter = (value: string, field: string) => {
    setSelectFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const setDateRangeFilter = (
    field: string,
    startDate: string,
    endDate: string
  ) => {
    setDateRangeFilters((prevFilters) => ({
      ...prevFilters,
      [field]: { startDate, endDate },
    }));
  };

  const getFilterOptions = (field: keyof Package): string[] => {
    const uniqueOptions = Array.from(
      new Set(flightBookingTable.map((item) => item[field]?.toString() || ""))
    );
    return uniqueOptions.filter((option) => option.trim() !== "");
  };

  return {
    filteredTableData,
    searchQuery,
    setSearchQuery,
    setSelectFilter,
    setDateRangeFilter,
    getFilterOptions,
  };
}

export function useFilter(flights: Flight[]) {
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [priceRangeValues, setPriceRangeValues] = useState<[number, number]>([
    0, 0,
  ]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [airlineNames, setAirlineNames] = useState<
    { name: string; price: number }[]
  >([]);
  const [sortOption, setSortOption] = useState<string>("cheapest");
  const [cheapestPrice, setCheapestPrice] = useState<number | null>(null);
  const [earliestTime, setEarliestTime] = useState<string | null>(null);
  const [fastestDuration, setFastestDuration] = useState<string | null>(null);
  const [selectedFlightType, setSelectedFlightType] = useState<string>(""); // For flight type filtering
  const [selectedRefundType, setSelectedRefundType] = useState<string>(""); // For refundability filtering

  useEffect(() => {
    if (flights.length > 0) {
      // Calculate min and max prices
      const prices = flights.map((flight) => flight.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);

      // Set cheapest price
      setCheapestPrice(minPrice);

      // Initialize price range values
      setPriceRangeValues([minPrice, maxPrice]);
      setFilteredFlights(flights);

      // Extract unique airline names with prices
      const uniqueAirlines = flights.reduce<{ name: string; price: number }[]>(
        (acc, flight) => {
          flight.airlines.forEach((airline) => {
            if (!acc.some((item) => item.name === airline.name)) {
              acc.push({ name: airline.name, price: flight.price });
            }
          });
          return acc;
        },
        []
      );
      setAirlineNames(uniqueAirlines);

      // Find the earliest time
      const times = flights
        .flatMap((flight) =>
          flight.airlines.map((airline) => airline.departureTime)
        )
        .sort((a, b) => a.localeCompare(b));
      setEarliestTime(times[0]);

      // Find the fastest duration
      const durations = flights
        .flatMap((flight) =>
          flight.airlines.map((airline) => parseDuration(airline.duration))
        )
        .sort((a, b) => a - b);
      setFastestDuration(formatDuration(durations[0]));
    }
  }, [flights]);

  useEffect(() => {
    // Filter flights by selected airlines, price range, flight type, and refundability
    let filtered = flights.filter(
      (flight) =>
        flight.price >= priceRangeValues[0] &&
        flight.price <= priceRangeValues[1] &&
        (selectedAirlines.length === 0 ||
          flight.airlines.some((airline) =>
            selectedAirlines.includes(airline.name)
          )) &&
        (selectedFlightType === "" ||
          flight.flightType === selectedFlightType) &&
        (selectedRefundType === "" ||
          (selectedRefundType === "Refundable" && flight.refundable) ||
          (selectedRefundType === "Non-Refundable" && !flight.refundable))
    );

    // Sort flights based on the selected sort option
    switch (sortOption) {
      case "cheapest":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "earliest":
        filtered = filtered.sort((a, b) =>
          a.airlines[0]?.departureTime.localeCompare(
            b.airlines[0]?.departureTime
          )
        );
        break;
      case "fastest":
        filtered = filtered.sort(
          (a, b) =>
            parseDuration(a.airlines[0]?.duration) -
            parseDuration(b.airlines[0]?.duration)
        );
        break;
      default:
        break;
    }

    setFilteredFlights(filtered);
  }, [
    priceRangeValues,
    selectedAirlines,
    selectedFlightType,
    selectedRefundType,
    flights,
    sortOption,
  ]);

  const handleAirlineSelect = (name: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleFlightTypeChange = (type: string) => {
    setSelectedFlightType(type);
  };

  const handleRefundTypeChange = (type: string) => {
    setSelectedRefundType(type);
  };

  const parseDuration = (duration: string) => {
    const [hours, minutes] = duration.split(/[hr|m]/).map(Number);
    return hours * 60 + minutes;
  };

  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}hr ${mins}m`;
  };

  return {
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
  };
}
