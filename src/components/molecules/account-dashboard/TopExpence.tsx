import React, { useEffect, useState } from "react";

import CardTitle from "@/components/atoms/CardTitle";
import Span from "@/components/atoms/Span";
import { Button } from "@/components/atoms/Button";
import { FaSackDollar } from "react-icons/fa6";



type ExpenceType ={
  id:number;
  invoiceId:string;
  amount:number;
  date:string;
}

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/account-dashboard/top-expence`;
const initialCount =5

const TopExpence: React.FC = ({
 
}) => {
  const [expence, setExpence] = useState<ExpenceType[] | []>([]);
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(true);

  const handleShowMore = () => {
    setVisibleCount(expence.length);
  };

  const handleShowLess = () => {
    setVisibleCount(initialCount);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setExpence(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);
  
  return (
    <div className="p-4 ">
      <CardTitle className="font-semibold text-xl">Top expenses </CardTitle>

      {isLoading ? (
        <div className="flex justify-center items-center mt-5">
          <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {expence.slice(0, visibleCount).map((expen) => (
            <div
              key={expen.id}
              className="flex items-center mt-5 justify-between border-b-2 border-b-[#DCDCDC] pb-2 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
              

                  <div className="rounded-full w-[30px] h-[32px] bg-gray-300 text-[#7549FF] flex items-center justify-center">
                  <FaSackDollar />
                  </div>
            
                <div className="flex flex-col">
                  <Span className="text-sm font-semibold text-[#243045] dark:text-white">
                    {expen.invoiceId}
                  </Span>
                  <Span className="text-xs font-semibold text-[#7C7C7C] dark:text-white">
                    {expen.date}
                  </Span>
                </div>
              </div>
              <div>
                <Button className="text-sm font-semibold text-[#7549FF] bg-[#E8E1FD] px-2 py-1.5 rounded-md hover:bg-[#7549FF] hover:text-[#E8E1FD] transition-all duration-300">
                  {expen.amount}
                </Button>
              </div>
            </div>
          ))}

          {visibleCount < expence.length ? (
            <Button
              className="bg-[#EDF2FD] w-full mt-4 py-2 rounded text-[#257CEB] font-bold hover:bg-[#257CEB] hover:text-[#EDF2FD] duration-300"
              onClick={handleShowMore}
            >
              Show More
            </Button>
          ) : (
            <Button
              className="bg-[#EDF2FD] w-full mt-4 py-2 rounded text-[#257CEB] font-bold hover:bg-[#257CEB] hover:text-[#EDF2FD] duration-300"
              onClick={handleShowLess}
            >
              Show Less
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default TopExpence;
