import React from "react";

const TableLoader: React.FC = () => {
  return (
    <div className="animate-pulse bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            {[...Array(11)].map((_, index) => (
              <th
                key={index}
                className="px-6 py-3 bg-gray-200 rounded-md h-6"
              >
                <div className="bg-gray-300 w-full h-full rounded-md"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, rowIndex) => (
            <tr key={rowIndex} className="border-t border-gray-300">
              {[...Array(10)].map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 border-b border-gray-300"
                >
                  <div className="bg-gray-300 w-full h-4 rounded-md"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLoader;
