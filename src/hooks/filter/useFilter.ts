import { useState, useMemo } from "react";
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
