import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";
import GrowthChartTop from "./GrowthChartTop";


const apiUrl =`${process.env.NEXT_PUBLIC_API_URL}/api/v1/account-dashboard/groth-chart`;

// Custom function to render labels on each slice

type DataItem ={
  name: string;
  value: number;
  color: string;
}
const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      style={{ pointerEvents: "none" }} // Prevent hover conflicts with the tooltip
    >
      {value}%
    </text>
  );
};

// Custom Tooltip Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div className="bg-white p-2 shadow-md rounded">
        <p className="font-bold">{name}</p>
        <p>Value: {value}%</p>
      </div>
    );
  }
  return null;
};

const GrowthChart = () => {

  const [data, setData] = useState<DataItem[] |[] >([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=>{
    const fetchData  = async () =>{
      try {
        const response = await fetch(apiUrl);
        if(!response.ok){
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        setError(error.message)
      }finally{
        setIsLoading(false);
      }
      
    } 
    fetchData();
  },[])

  return (
    <div>
      <GrowthChartTop />
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      ):
      error ?(
        <div className="text-center text-red-500">{error}</div>
      ):(

      <div className="flex items-center">
        <ResponsiveContainer width="50%" height={400} className="ml-4">
          <PieChart>
            {/* Add the central text */}
            <text
  x="50%"
  y="50%"
  textAnchor="middle"
  dominantBaseline="central"
  style={{ fontSize: "12px", fontWeight: "bold" }}
  className="fill-gray-800 dark:fill-white"
>
  Total Percent
</text>

            <Pie
             data={data || []}
             cx="50%"
             cy="50%"
             innerRadius="60%"
             outerRadius="100%"
             dataKey="value"
             label={renderLabel}
             labelLine={false}
            >
              {data?.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="ml-10">
          <ul>
            {data?.map((item,index) => (
              <li
                key={index}
                className="font-normal text-sm mb-1 rounded-md flex items-center"
              >
                <span
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></span>
                <strong>{item.name}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
      )
      }
    </div>
  );
};

export default GrowthChart;
