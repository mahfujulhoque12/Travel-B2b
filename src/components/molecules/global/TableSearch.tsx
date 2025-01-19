import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Search } from "lucide-react";
import { Input } from "@/components/atoms/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

const TableSearch = ({
  searchQuery,
  setSearchQuery,
  className,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  className?:string;
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const debouncedQuery = useDebounce(localQuery, 200);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <div className={cn("relative max-w-sm",className)}>
      <Input
        id="searchBox"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search here"
        className="w-full  h-9 pl-10 border dark:placeholder:text-white rounded-md outline-none dark:text-white dark:bg-darkButtonBg bg-white shadow-none focus-visible:ring-1 focus:ring-0 focus:outline-none"
      />
      {localQuery && (
        <Button
          className="hover:bg-[#F5F7FA] px-1 py-1 absolute right-2 top-1/2 rounded-full transform -translate-y-1/2 "
          aria-label="Clear selection"
          onClick={() => {
            setLocalQuery("");
            setSearchQuery("");
            document.getElementById("searchBox")?.focus();
          }}
        >
          <X className="w-4 h-4 text-gray-500 dark:text-white" />
        </Button>
      )}
      <Button className="absolute left-3 pl-1 top-1/2 rounded-sm transform -translate-y-1/2 ">
        <Search className=" text-[#8391A1] w-4 h-4" />
      </Button>
    </div>
  );
};

export default TableSearch;