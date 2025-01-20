import SearchBookingWrapper from "@/components/organisms/search/SearchBookingWrapper";

export default async function Page() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/flight-terminals`,
    { cache: "no-cache" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch flight terminals");
  }
  const data = await response.json();
  const terminals = data.terminals;
  return <SearchBookingWrapper terminals={terminals} />;
}
