import React from "react";
import { twMerge } from "tailwind-merge";
import DateRangeOneFilter from "../../../molecules/date/DatePicker";

const AccountsTable = ({ accounts }) => {
  const totalNetReceivable = accounts.reduce(
    (total, account) =>
      account.name === "Net Receivable" ? total + account.amount : total,
    0
  );

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="w-fit ml-auto ">
        <DateRangeOneFilter handleDateChange={(date) => console.log(date)} />
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr className="divide-x">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Accounts
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Count
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((account, index) => (
              <tr
                key={index}
                className={
                  account.name === "Net Receivable" ? "bg-blue-50" : ""
                }
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                  {account.name}
                </td>
                <td
                  className={twMerge(
                    "px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 ",
                    account.count != null && "border-l"
                  )}
                >
                  {account.count ?? ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right border-l">
                  {account.amount < 0 ? "-" : ""}₹
                  {Math.abs(account.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr className="divide-x">
              <td
                colSpan="2"
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                Net Receivable
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                ₹{totalNetReceivable.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AccountsTable;
