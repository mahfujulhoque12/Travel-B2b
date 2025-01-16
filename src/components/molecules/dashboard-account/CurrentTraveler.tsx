import React, { useEffect, useState } from "react";
import Image from "next/image";
import CardTitle from "@/components/atoms/CardTitle";
import Span from "@/components/atoms/Span";
import { Button } from "@/components/atoms/Button";

type TravelerType = {
    id: number;
    name: string;
    image: string;
    amount: string;
    email: string;
    [key: string]: string | number; // Allow string keys
  };

type TravelerListProps = {
  apiUrl: string;
  initialCount?: number; // Default to 6 if not provided
  nameKey?: string; // Key for the traveler name field
  emailKey?: string; // Key for the traveler email field
  amountKey?: string; // Key for the traveler amount field
  imageKey?: string; // Key for the traveler image field
  title?: string; //
};

const TravelerList: React.FC<TravelerListProps> = ({
  apiUrl,
  initialCount = 6,
  nameKey = "name",
  emailKey = "email",
  amountKey = "amount",
  imageKey = "image",
  title="Travelers",
}) => {
  const [travelers, setTravelers] = useState<TravelerType[] | []>([]);
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(true);

  const handleShowMore = () => {
    setVisibleCount(travelers.length);
  };

  const handleShowLess = () => {
    setVisibleCount(initialCount);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setTravelers(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="p-4 ">
      <CardTitle className="font-semibold text-xl">{title}</CardTitle>

      {isLoading ? (
        <div className="flex justify-center items-center mt-[50%]">
          <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {travelers.slice(0, visibleCount).map((traveler) => (
            <div
              key={traveler.id}
              className="flex items-center mt-5 justify-between border-b-2 border-b-[#DCDCDC] dark:border-gray-700 pb-2"
            >
              <div className="flex items-center gap-3">
                {traveler[imageKey] ? (
                 <Image
                 src={traveler[imageKey as keyof TravelerType] as string}
                 alt={traveler[nameKey as keyof TravelerType] as string}
                 className="rounded-full w-[30px] h-[32px]"
                 width={30}
                 height={32}
               />
                ) : (
                  <div className="rounded-full w-[30px] h-[32px] bg-gray-300 flex items-center justify-center">
                    <span className="text-sm text-white">N/A</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <Span className="text-sm font-semibold text-[#243045] dark:text-white">
                    {traveler[nameKey]}
                  </Span>
                  <Span className="text-xs font-semibold text-[#7C7C7C] dark:text-white">
                    {traveler[emailKey]}
                  </Span>
                </div>
              </div>
              <div>
                <Span className="text-base font-semibold text-[#243045] dark:text-white">
                  {traveler[amountKey]}
                </Span>
              </div>
            </div>
          ))}

          {visibleCount < travelers.length ? (
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

export default TravelerList;
