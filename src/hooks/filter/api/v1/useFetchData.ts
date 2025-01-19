import { useEffect, useState } from "react";
import useSWR from "swr";
import { Flight } from "@/types/api";

export const usePaginatedFetchData = (
  apiUrls: string[],
  activeTab: number,
  currentPage: number,
  limit: number
) => {
  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    });

  const url = `${apiUrls[activeTab]}?page=${currentPage}&limit=${limit}`;

  const { data, error } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  // Return the data indexed by the API URL
  const indexedData = {
    [apiUrls[activeTab]]: data?.data || [],
  };

  return {
    data: indexedData,
    totalPages: data?.totalPages || 1,
    isLoading: !error && !data,
    error: error?.message || null,
  };
};

/* get flights */
export function useGetFlights() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchFlights() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/flight-list`,
          { signal: controller.signal }
        );
        const { flights } = await response.json();
        setFlights(flights);
      } catch (err) {
        if (err instanceof DOMException && err.name !== "AbortError") {
          setError("Failed to fetch flights.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchFlights();

    return () => {
      controller.abort();
    };
  }, []);

  return { flights, error, isLoading };
}
/* get flights */
