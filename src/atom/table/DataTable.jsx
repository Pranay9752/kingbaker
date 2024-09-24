// DataTable.js

import React from 'react';

const DataTable = ({ headers, data }) => {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 text-center bg-white">
              <thead>
                <tr className="divide-x divide-gray-200">
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-lg font-medium text-gray-500 uppercase"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index} className="divide-x divide-gray-200">
                    {headers.map((header, i) => (
                      <td
                        key={i}
                        className="px-6 py-4 whitespace-nowrap text-lg text-gray-800"
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
