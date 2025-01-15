import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import CardTitle from "@/components/atoms/CardTitle";
import Span from "@/components/atoms/Span";
import { Button } from "@/components/atoms/Button";
import Table, { ColumnConfig } from "../global/Table";

type RecentHistoryProps = {
  title: string;
  subtitle?: string;
  columns: ColumnConfig[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchData: () => Promise<any[]>; // Function to fetch data dynamically
  buttonLabel?: string;
  onButtonClick?: () => void;
};

const RecentHistory: React.FC<RecentHistoryProps> = ({
  title,
  subtitle,
  columns,
  fetchData,
  buttonLabel = "View All",
  onButtonClick,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchData()
      .then((fetchedData) => setData(fetchedData))
      .finally(() => setIsLoading(false));
  }, [fetchData]);

  return (
    <div className="mt-6">
     

      {isLoading ? (
        <div className="mt-5 animate-pulse">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
            </div>
            <div className="mt-5">
              <div className="w-full h-72 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
             <div className="flex items-center justify-between">
        <div>
          <CardTitle className="font-semibold text-xl text-[#243045] dark:text-white">
            {title}
          </CardTitle>
          {subtitle && <Span>{subtitle}</Span>}
        </div>
        {onButtonClick && (
          <Button
            onClick={onButtonClick}
            className="text-sm font-normal text-[#243045] p-2.5 rounded-md bg-[#EFEFEF] flex items-center gap-2 hover:bg-[#257CEB] hover:text-[#EDF2FD] duration-300"
          >
            {buttonLabel} <MdArrowForwardIos />
          </Button>
        )}
      </div>
        <div className="mt-5">
          <Table data={data} columns={columns} />
        </div>
        </div>
       
      )}
    </div>
  );
};

export default RecentHistory;
