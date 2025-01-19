import { useEffect, useState, useMemo } from "react";
import { Flight, HajjUmrahPackage, Hotel, Car, PackageType } from "@/types/api";
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
  const [isCalendarFiltered, setIsCalendarFiltered] = useState<boolean>(false);

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

    // Apply date range filters
    Object.entries(dateRangeFilters).forEach(
      ([field, { startDate, endDate }]) => {
        if (field) {
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
    setDateRangeFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [field]: { startDate, endDate },
      };

      // Update the `isCalendarFiltered` state based on active filters
      const hasFilters = Object.values(updatedFilters).some(
        (filter) => filter.startDate || filter.endDate
      );
      setIsCalendarFiltered(hasFilters);

      return updatedFilters;
    });
  };

  const getFilterOptions = (field: keyof Package): string[] => {
    const uniqueOptions = Array.from(
      new Set(flightBookingTable.map((item) => item[field]?.toString() || ""))
    );
    return uniqueOptions.filter((option) => option.trim() !== "");
  };

  // Reset date and select filters
  const resetFilters = () => {
    setDateRangeFilters({});
    setSelectFilters({});
    setIsCalendarFiltered(false); // Reset tracking state
  };

  return {
    filteredTableData,
    searchQuery,
    setSearchQuery,
    setSelectFilter,
    setDateRangeFilter,
    getFilterOptions,
    resetFilters, // Updated to reset both date and select filters
    isCalendarFiltered, // Expose isCalendarFiltered
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

export function useHajjUmrahFilter(hajjUmrahPackages: HajjUmrahPackage[]) {
  const [filteredHajjUmrah, setFilteredHajjUmrah] = useState<
    HajjUmrahPackage[]
  >([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [priceRangeValues, setPriceRangeValues] = useState<[number, number]>([
    0, 0,
  ]);
  const [selectedFlightType, setSelectedFlightType] = useState<string>("");
  const [hotelDistances, setHotelDistances] = useState<number[]>([]);
  const [selectedDistances, setSelectedDistances] = useState<number[]>([]);
  const [hotelStars, setHotelStars] = useState<number[]>([]); // New State for hotel stars
  const [selectedStars, setSelectedStars] = useState<number[]>([]); // New State for selected stars
  const [selectedPackageType, setSelectedPackageType] = useState<string>("");

  useEffect(() => {
    if (hajjUmrahPackages.length > 0) {
      // Calculate the min and max prices from the hajjUmrahPackages data
      const prices = hajjUmrahPackages.map(
        (hajjUmrahPackage) => hajjUmrahPackage.price
      );
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);

      setPriceRangeValues([minPrice, maxPrice]);
      setFilteredHajjUmrah(hajjUmrahPackages);

      // Extract unique hotelDistance values
      const distances = hajjUmrahPackages.map(
        (hajjUmrahPackage) => hajjUmrahPackage.hotelDistance
      );
      setHotelDistances([...new Set(distances)]);

      // Extract unique hotelStar values
      const stars = hajjUmrahPackages.map(
        (hajjUmrahPackage) => hajjUmrahPackage.hotelStars
      );
      setHotelStars([...new Set(stars)]); // Unique stars
    }
  }, [hajjUmrahPackages]);

  useEffect(() => {
    const filtered = hajjUmrahPackages.filter((hajjUmrahPackage) => {
      // Filter by price range
      const isWithinPriceRange =
        hajjUmrahPackage.price >= priceRangeValues[0] &&
        hajjUmrahPackage.price <= priceRangeValues[1];

      // Filter by flight type
      const matchesFlightType =
        selectedFlightType === "" ||
        (selectedFlightType === "Flight" && hajjUmrahPackage.flightIncluded) ||
        (selectedFlightType === "Without Flight" &&
          !hajjUmrahPackage.flightIncluded);

      // Filter by selected distances
      const matchesDistance =
        selectedDistances.length === 0 ||
        selectedDistances.includes(hajjUmrahPackage.hotelDistance);

      // Filter by selected stars
      const matchesStars =
        selectedStars.length === 0 ||
        selectedStars.includes(hajjUmrahPackage.hotelStars);

      // Filter by package type
      const matchesPackageType =
        selectedPackageType === "" ||
        hajjUmrahPackage.packageType === selectedPackageType;

      return (
        isWithinPriceRange &&
        matchesFlightType &&
        matchesDistance &&
        matchesStars &&
        matchesPackageType
      );
    });

    setFilteredHajjUmrah(filtered);
  }, [
    priceRangeValues,
    hajjUmrahPackages,
    selectedFlightType,
    selectedDistances,
    selectedStars,
    selectedPackageType,
  ]);

  const handleFlightTypeChange = (type: string) => {
    setSelectedFlightType(type);
  };

  const handleDistanceChange = (distances: number[]) => {
    setSelectedDistances(distances);
  };

  const handleStarChange = (stars: number[]) => {
    setSelectedStars(stars);
  };

  const handlePackageTypeChange = (type: string) => {
    setSelectedPackageType(type);
  };

  return {
    minPrice,
    maxPrice,
    priceRangeValues,
    setPriceRangeValues,
    filteredHajjUmrah,
    selectedFlightType,
    handleFlightTypeChange,
    hotelDistances,
    selectedDistances,
    handleDistanceChange,
    hotelStars,
    selectedStars,
    handleStarChange,
    selectedPackageType,
    handlePackageTypeChange,
  };
}

export function useHotelFilter(hotelData: Hotel[]) {
  const [filteredHotel, setFilteredHotel] = useState<Hotel[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [priceRangeValues, setPriceRangeValues] = useState<[number, number]>([
    0, 0,
  ]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [starCounts, setStarCounts] = useState<Record<number, number>>({});
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedRoomViews, setSelectedRoomViews] = useState<string[]>([]);
  const [locationRangeValues, setLocationRangeValues] = useState<
    [number, number]
  >([0, 50]);
  const [minLocationRange, setMinLocationRange] = useState<number>(0);
  const [maxLocationRange, setMaxLocationRange] = useState<number>(50);
  const [selectedMeals, setSelectedselectedMeals] = useState<string[]>([]);
  const [selectedHouseRules, setSelectedselectedHouseRules] = useState<
    string[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search query

  // Initialize filters and ranges
  useEffect(() => {
    if (hotelData.length > 0) {
      // Price range calculation
      const prices = hotelData.map((hotel) => hotel.discountPrice);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
      setPriceRangeValues([minPrice, maxPrice]);

      // Location range calculation
      const distances = hotelData.flatMap((hotel) =>
        hotel.locationRange.replace(" km", "").split("-").map(Number)
      );
      const minLocation = Math.min(...distances);
      const maxLocation = Math.max(...distances);
      setMinLocationRange(minLocation);
      setMaxLocationRange(maxLocation);
      setLocationRangeValues([minLocation, maxLocation]);

      setFilteredHotel(hotelData);
    }
  }, [hotelData]);

  // Apply filters
  useEffect(() => {
    if (minPrice !== null && maxPrice !== null) {
      const filtered = hotelData.filter((hotel) => {
        const [minDistance, maxDistance] = hotel.locationRange
          .replace(" km", "")
          .split("-")
          .map(Number);

        return (
          hotel.discountPrice >= priceRangeValues[0] &&
          hotel.discountPrice <= priceRangeValues[1] &&
          (selectedStars.length === 0 ||
            selectedStars.includes(hotel.starRating)) &&
          (selectedFacilities.length === 0 ||
            selectedFacilities.every((facility) =>
              hotel.facilities.includes(facility)
            )) &&
          (selectedRoomViews.length === 0 ||
            selectedRoomViews.every((view) =>
              hotel.roomViews.includes(view)
            )) &&
          (selectedHouseRules.length === 0 ||
            selectedHouseRules.every((rules) =>
              hotel.houseRules.includes(rules)
            )) &&
          minDistance >= locationRangeValues[0] &&
          maxDistance <= locationRangeValues[1] &&
          (selectedMeals.length === 0 ||
            selectedMeals.every((meal) => hotel.mealOptions.includes(meal))) &&
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by search query
        );
      });
      setFilteredHotel(filtered);

      // Calculate star counts from the filtered hotels
      const counts = filtered.reduce<Record<number, number>>((acc, hotel) => {
        acc[hotel.starRating] = (acc[hotel.starRating] || 0) + 1;
        return acc;
      }, {});
      setStarCounts(counts);
    }
  }, [
    priceRangeValues,
    hotelData,
    minPrice,
    maxPrice,
    selectedStars,
    selectedFacilities,
    selectedRoomViews,
    locationRangeValues,
    selectedMeals,
    selectedHouseRules,
    searchQuery,
  ]);

  // Extract unique facilities
  const allFacilities = Array.from(
    new Set(hotelData.flatMap((hotel) => hotel.facilities))
  );
  const allRoomViews = Array.from(
    new Set(hotelData.flatMap((hotel) => hotel.roomViews))
  );
  const allMeals = Array.from(
    new Set(hotelData.flatMap((hotel) => hotel.mealOptions))
  );
  const houseRules = Array.from(
    new Set(hotelData.flatMap((hotel) => hotel.houseRules))
  );

  // Determine if filters are applied
  const isPriceFilterApplied =
    minPrice !== null &&
    maxPrice !== null &&
    (priceRangeValues[0] !== minPrice || priceRangeValues[1] !== maxPrice);

  const isStarFilterApplied = selectedStars.length > 0;

  const isFacilitiesFilterApplied = selectedFacilities.length > 0;

  const isRoomViewFilterApplied = selectedRoomViews.length > 0;

  const isLocationRangeFilterApplied =
    locationRangeValues[0] !== minLocationRange ||
    locationRangeValues[1] !== maxLocationRange;

  const isMealsFilterApplied = selectedMeals.length > 0;

  const isHouseRulesFilterApplied = selectedHouseRules.length > 0;

  const isSearchQueryApplied = searchQuery.trim() !== "";

  // Reset functions
  const resetPriceFilter = () =>
    setPriceRangeValues([minPrice ?? 0, maxPrice ?? 0]);
  const resetStarFilter = () => setSelectedStars([]);
  const resetFacilitiesFilter = () => setSelectedFacilities([]);
  const resetRoomViewFilter = () => setSelectedRoomViews([]);
  const resetLocationRangeFilter = () =>
    setLocationRangeValues([minLocationRange, maxLocationRange]);
  const resetMealsFilter = () => setSelectedselectedMeals([]);
  const resetHouseRulesFilter = () => setSelectedselectedHouseRules([]);
  const resetSearchQuery = () => setSearchQuery("");

  const resetAllFilters = () => {
    resetPriceFilter();
    resetStarFilter();
    resetFacilitiesFilter();
    resetRoomViewFilter();
    resetLocationRangeFilter();
    resetMealsFilter();
    resetHouseRulesFilter();
    resetSearchQuery();
  };

  // Count the total number of applied filters
  const appliedFilterCount = [
    isPriceFilterApplied ? 1 : 0,
    isStarFilterApplied ? 1 : 0,
    isFacilitiesFilterApplied ? 1 : 0,
    isRoomViewFilterApplied ? 1 : 0,
    isLocationRangeFilterApplied ? 1 : 0,
    isMealsFilterApplied ? 1 : 0,
    isHouseRulesFilterApplied ? 1 : 0,
    isSearchQueryApplied ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0);

  return {
    searchQuery,
    setSearchQuery,
    minPrice,
    maxPrice,
    priceRangeValues,
    setPriceRangeValues,
    filteredHotel,
    selectedStars,
    setSelectedStars,
    starCounts,
    selectedFacilities,
    setSelectedFacilities,
    allFacilities,
    selectedRoomViews,
    setSelectedRoomViews,
    allRoomViews,
    locationRangeValues,
    setLocationRangeValues,
    minLocationRange,
    maxLocationRange,
    selectedMeals,
    setSelectedselectedMeals,
    allMeals,
    selectedHouseRules,
    setSelectedselectedHouseRules,
    houseRules,
    resetPriceFilter,
    resetStarFilter,
    resetFacilitiesFilter,
    resetRoomViewFilter,
    resetLocationRangeFilter,
    resetMealsFilter,
    resetHouseRulesFilter,
    resetSearchQuery,
    resetAllFilters,
    isPriceFilterApplied,
    isStarFilterApplied,
    isFacilitiesFilterApplied,
    isRoomViewFilterApplied,
    isLocationRangeFilterApplied,
    isMealsFilterApplied,
    isHouseRulesFilterApplied,
    isSearchQueryApplied,
    appliedFilterCount,
  };
}

export function usePackageFilter(packageData: PackageType[]) {
  const [filteredPackage, setFilteredHotel] = useState<Hotel[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [priceRangeValues, setPriceRangeValues] = useState<[number, number]>([
    0, 0,
  ]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [starCounts, setStarCounts] = useState<Record<number, number>>({});
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedRoomViews, setSelectedRoomViews] = useState<string[]>([]);
  const [locationRangeValues, setLocationRangeValues] = useState<
    [number, number]
  >([0, 50]);
  const [minLocationRange, setMinLocationRange] = useState<number>(0);
  const [maxLocationRange, setMaxLocationRange] = useState<number>(50);
  const [selectedMeals, setSelectedselectedMeals] = useState<string[]>([]);
  const [selectedHouseRules, setSelectedselectedHouseRules] = useState<
    string[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search query

  // Initialize filters and ranges
  useEffect(() => {
    if (packageData.length > 0) {
      // Price range calculation
      const prices = packageData.map((hotel) => hotel.discountPrice);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
      setPriceRangeValues([minPrice, maxPrice]);

      // Location range calculation
      const distances = packageData.flatMap((hotel) =>
        hotel.locationRange.replace(" km", "").split("-").map(Number)
      );
      const minLocation = Math.min(...distances);
      const maxLocation = Math.max(...distances);
      setMinLocationRange(minLocation);
      setMaxLocationRange(maxLocation);
      setLocationRangeValues([minLocation, maxLocation]);

      setFilteredHotel(packageData);
    }
  }, [packageData]);

  // Apply filters
  useEffect(() => {
    if (minPrice !== null && maxPrice !== null) {
      const filtered = packageData.filter((hotel) => {
        const [minDistance, maxDistance] = hotel.locationRange
          .replace(" km", "")
          .split("-")
          .map(Number);

        return (
          hotel.discountPrice >= priceRangeValues[0] &&
          hotel.discountPrice <= priceRangeValues[1] &&
          (selectedStars.length === 0 ||
            selectedStars.includes(hotel.starRating)) &&
          (selectedFacilities.length === 0 ||
            selectedFacilities.every((facility) =>
              hotel.facilities.includes(facility)
            )) &&
          (selectedRoomViews.length === 0 ||
            selectedRoomViews.every((view) =>
              hotel.roomViews.includes(view)
            )) &&
          (selectedHouseRules.length === 0 ||
            selectedHouseRules.every((rules) =>
              hotel.houseRules.includes(rules)
            )) &&
          minDistance >= locationRangeValues[0] &&
          maxDistance <= locationRangeValues[1] &&
          (selectedMeals.length === 0 ||
            selectedMeals.every((meal) => hotel.mealOptions.includes(meal))) &&
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by search query
        );
      });
      setFilteredHotel(filtered);

      // Calculate star counts from the filtered hotels
      const counts = filtered.reduce<Record<number, number>>((acc, hotel) => {
        acc[hotel.starRating] = (acc[hotel.starRating] || 0) + 1;
        return acc;
      }, {});
      setStarCounts(counts);
    }
  }, [
    priceRangeValues,
    packageData,
    minPrice,
    maxPrice,
    selectedStars,
    selectedFacilities,
    selectedRoomViews,
    locationRangeValues,
    selectedMeals,
    selectedHouseRules,
    searchQuery,
  ]);

  // Extract unique facilities
  const allFacilities = Array.from(
    new Set(packageData.flatMap((hotel) => hotel.facilities))
  );
  const allRoomViews = Array.from(
    new Set(packageData.flatMap((hotel) => hotel.roomViews))
  );
  const allMeals = Array.from(
    new Set(packageData.flatMap((hotel) => hotel.mealOptions))
  );
  const houseRules = Array.from(
    new Set(packageData.flatMap((hotel) => hotel.houseRules))
  );

  // Determine if filters are applied
  const isPriceFilterApplied =
    minPrice !== null &&
    maxPrice !== null &&
    (priceRangeValues[0] !== minPrice || priceRangeValues[1] !== maxPrice);

  const isStarFilterApplied = selectedStars.length > 0;

  const isFacilitiesFilterApplied = selectedFacilities.length > 0;

  const isRoomViewFilterApplied = selectedRoomViews.length > 0;

  const isLocationRangeFilterApplied =
    locationRangeValues[0] !== minLocationRange ||
    locationRangeValues[1] !== maxLocationRange;

  const isMealsFilterApplied = selectedMeals.length > 0;

  const isHouseRulesFilterApplied = selectedHouseRules.length > 0;

  const isSearchQueryApplied = searchQuery.trim() !== "";

  // Reset functions
  const resetPriceFilter = () =>
    setPriceRangeValues([minPrice ?? 0, maxPrice ?? 0]);
  const resetStarFilter = () => setSelectedStars([]);
  const resetFacilitiesFilter = () => setSelectedFacilities([]);
  const resetRoomViewFilter = () => setSelectedRoomViews([]);
  const resetLocationRangeFilter = () =>
    setLocationRangeValues([minLocationRange, maxLocationRange]);
  const resetMealsFilter = () => setSelectedselectedMeals([]);
  const resetHouseRulesFilter = () => setSelectedselectedHouseRules([]);
  const resetSearchQuery = () => setSearchQuery("");

  const resetAllFilters = () => {
    resetPriceFilter();
    resetStarFilter();
    resetFacilitiesFilter();
    resetRoomViewFilter();
    resetLocationRangeFilter();
    resetMealsFilter();
    resetHouseRulesFilter();
    resetSearchQuery();
  };

  // Count the total number of applied filters
  const appliedFilterCount = [
    isPriceFilterApplied ? 1 : 0,
    isStarFilterApplied ? 1 : 0,
    isFacilitiesFilterApplied ? 1 : 0,
    isRoomViewFilterApplied ? 1 : 0,
    isLocationRangeFilterApplied ? 1 : 0,
    isMealsFilterApplied ? 1 : 0,
    isHouseRulesFilterApplied ? 1 : 0,
    isSearchQueryApplied ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0);

  return {
    searchQuery,
    setSearchQuery,
    minPrice,
    maxPrice,
    priceRangeValues,
    setPriceRangeValues,
    filteredPackage,
    selectedStars,
    setSelectedStars,
    starCounts,
    selectedFacilities,
    setSelectedFacilities,
    allFacilities,
    selectedRoomViews,
    setSelectedRoomViews,
    allRoomViews,
    locationRangeValues,
    setLocationRangeValues,
    minLocationRange,
    maxLocationRange,
    selectedMeals,
    setSelectedselectedMeals,
    allMeals,
    selectedHouseRules,
    setSelectedselectedHouseRules,
    houseRules,
    resetPriceFilter,
    resetStarFilter,
    resetFacilitiesFilter,
    resetRoomViewFilter,
    resetLocationRangeFilter,
    resetMealsFilter,
    resetHouseRulesFilter,
    resetSearchQuery,
    resetAllFilters,
    isPriceFilterApplied,
    isStarFilterApplied,
    isFacilitiesFilterApplied,
    isRoomViewFilterApplied,
    isLocationRangeFilterApplied,
    isMealsFilterApplied,
    isHouseRulesFilterApplied,
    isSearchQueryApplied,
    appliedFilterCount,
  };
}

export function useCarFilter(carData: Car[]) {
  const [filteredCar, setFilteredCar] = useState<Car[]>(carData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [priceRangeValues, setPriceRangeValues] = useState<[number, number]>([
    0, 0,
  ]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPax, setSelectedPax] = useState<number[]>([]);

  useEffect(() => {
    if (carData.length > 0) {
      const prices = carData.map((car) => car.discountPricePerDay);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
      setPriceRangeValues([minPrice, maxPrice]);

      setFilteredCar(carData);
    }
  }, [carData]);

  useEffect(() => {
    const filtered = carData.filter((car) => {
      const matchesSearch = car.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPrice =
        car.discountPricePerDay >= priceRangeValues[0] &&
        car.discountPricePerDay <= priceRangeValues[1];
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(car.type);
      const matchesPax =
        selectedPax.length === 0 || selectedPax.includes(car.pax);

      return matchesSearch && matchesPrice && matchesType && matchesPax;
    });

    setFilteredCar(filtered);
  }, [searchQuery, priceRangeValues, selectedTypes, selectedPax, carData]);

  // Extract unique car types
  const allTypes = Array.from(new Set(carData.map((car) => car.type)));
  const allPax = Array.from(new Set(carData.map((car) => car.pax)));

  // Reset functions
  const resetSearchQuery = () => setSearchQuery("");
  const resetPriceFilter = () =>
    setPriceRangeValues([minPrice ?? 0, maxPrice ?? 0]);
  const resetTypeFilter = () => setSelectedTypes([]);
  const resetPaxFilter = () => setSelectedPax([]);

  // Check if filters are applied
  const isSearchQueryApplied = searchQuery.trim() !== "";
  const isPriceFilterApplied =
    minPrice !== null &&
    maxPrice !== null &&
    (priceRangeValues[0] !== minPrice || priceRangeValues[1] !== maxPrice);
  const isTypeFilterApplied = selectedTypes.length > 0;
  const isPaxFilterApplied = selectedPax.length > 0;

  return {
    searchQuery,
    setSearchQuery,
    resetSearchQuery,
    isSearchQueryApplied,
    priceRangeValues,
    setPriceRangeValues,
    minPrice,
    maxPrice,
    resetPriceFilter,
    isPriceFilterApplied,
    selectedTypes,
    setSelectedTypes,
    resetTypeFilter,
    isTypeFilterApplied,
    selectedPax,
    setSelectedPax,
    resetPaxFilter,
    isPaxFilterApplied,
    filteredCar,
    allTypes,
    allPax,
  };
}
