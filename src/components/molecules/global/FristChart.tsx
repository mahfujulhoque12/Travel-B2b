
import CardTitle from "@/components/atoms/CardTitle";
import Span from "@/components/atoms/Span";
import React, { useState, useEffect } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Switcher from "../dashboard/Switcher";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard-flight`;

type DataItem = {
  name: string;
  Income: number;
  Expense: number;
  amt: string;
};

const FirstChart: React.FC = () => {
  



  const [data, setData] = useState<DataItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any ) {
     
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    
    <div className="h-[450px] flex flex-col">
      <Switcher/>

      {/* Title and Bar Legend Section */}
      <div className="h-[50px] flex items-center justify-between px-4 mb-3">
        <CardTitle className="text-2xl font-semibold text-[#243045]">
          $520.15 /{" "}
          <Span className="text-sm font-normal text-[#8391A1]">$454.002</Span>
        </CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#8884d8]"></div>
            <Span>Income</Span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#82ca9d]"></div>
            <Span>Expense</Span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-grow">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data || []}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(value) => `${value / 1000}k $`} // Format Y-axis ticks
              />
              <Tooltip formatter={(value) => `${value} $`} />{" "}
              {/* Format tooltip values */}
              <Bar dataKey="Income" fill="#8884d8" />
              <Bar dataKey="Expense" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default FirstChart;
