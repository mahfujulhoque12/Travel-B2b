"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

import CardTitle from "@/components/atoms/CardTitle";
import Span from "@/components/atoms/Span";
import ChartDropdownCom from "../dashboard-account/ChartDropdown";
import ChartDatePicker from "../dashboard-account/ChartDatePicker";

import Switch from "../dashboard-account/Switch";

type DataItem = {
  [key: string]: string | number; // Generalize the data item structure
};

type SecChartProps = {
  apiUrl: string;
  chartDataKeys: string[]; // Data keys to be used in BarChart
  title: string;
  subtitle: string;
  incomeLabel: string;
  expenseLabel: string;
  currencyFormatter: (value: number) => string; // Formatter for Y-axis and Tooltip
};

const SecChart: React.FC<SecChartProps> = ({
  apiUrl,
  chartDataKeys,
  title,
  subtitle,
  incomeLabel,
  expenseLabel,
  currencyFormatter,
}) => {
  const [data, setData] = useState<DataItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBarChart, setIsBarChart] = useState<boolean>(true); // State to toggle between BarChart and LineChart

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
    <div className=" flex flex-col">
      <div className="px-4 flex items-center justify-between mb-3">
        {/* Title Section */}
        <div>
          <span className="text-lg font-normal text-[#243045]">Income/Expense</span>
        </div>

        {/* Switch and Dropdown Section */}
        <div className="flex items-center justify-center gap-4">
          {/* Switch Section */}
         <Switch
         isChecked={!isBarChart}
         onChange={(checked) => setIsBarChart(!checked)}
         />

          {/* Orders Dropdown */}
          <ChartDropdownCom />

          {/* Day Picker Section */}
          <ChartDatePicker />
        </div>
      </div>

      {/* Title and Bar Legend Section */}
      <div className="h-[50px] flex items-center justify-between px-4 mb-3">
        <CardTitle className="text-2xl font-semibold text-[#FF6800]">
          {title}
          <Span className="text-sm text-[#8391A1] font-bold">{subtitle}</Span>
        </CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#FF6800]"></div>
            <Span>{incomeLabel}</Span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#1F73A1]"></div>
            <Span>{expenseLabel}</Span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-grow flex flex-col justify-center  overflow-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div> 
            {/* Conditionally render BarChart or LineChart */}
            {isBarChart ? (
              <div className="mb-0">
                <ResponsiveContainer width="100%" height={300}>
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
                        fill={index % 2 === 0 ? "#FF6800" : "#1F73A1"}
                        barSize={18}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
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
                    <Line
                      key={key}
                      dataKey={key}
                      stroke={index % 2 === 0 ? "#F45757" : "#165272"}
                      strokeWidth={3}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecChart;
