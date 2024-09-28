import React from 'react';

const DataTable = ({ headers, data }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1 min-w-full inline-block align-middle">
          <div className="border rounded-lg overflow-hidden shadow">
            <table className="min-w-full divide-y divide-gray-300 text-center bg-white">
              <thead className="bg-gray-100">
                <tr className="divide-x divide-gray-300">
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="divide-x divide-gray-300 hover:bg-gray-50"
                  >
                    {headers.map((header, i) => (
                      <td
                        key={i}
                        className="px-2 py-1 whitespace-nowrap text-xs md:text-sm text-gray-700"
                      >
                        {item[header.toLowerCase().replace(/\s+/g, '')] || 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
