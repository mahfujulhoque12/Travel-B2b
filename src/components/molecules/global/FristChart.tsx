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
import Switcher from "../dashboard-account/Switcher";

type DataItem = {
  [key: string]: string | number; // Generalize the data item structure
};

type FirstChartProps = {
  apiUrl: string;
  chartDataKeys: string[]; // Data keys to be used in BarChart
  title: string;
  incomeLabel: string;
  expenseLabel: string;
  currencyFormatter: (value: number) => string; // Formatter for Y-axis and Tooltip
};

const FirstChart: React.FC<FirstChartProps> = ({
  apiUrl,
  chartDataKeys,
  title,
  incomeLabel,
  expenseLabel,
  currencyFormatter,
}) => {
  const [data, setData] = useState<DataItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="h-[450px] flex flex-col">
      <Switcher />

      {/* Title and Bar Legend Section */}
      <div className="h-[50px] flex items-center justify-between px-4 mb-3">
        <CardTitle className="text-2xl font-semibold text-[#243045]">
          {title}
        </CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#8884d8]"></div>
            <Span>{incomeLabel}</Span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#82ca9d]"></div>
            <Span>{expenseLabel}</Span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-grow">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
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
              <YAxis tickFormatter={currencyFormatter} />
              <Tooltip formatter={currencyFormatter} />
              {chartDataKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
                  barSize={18}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default FirstChart;
