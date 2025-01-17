import { useState } from "react";
import { format } from "date-fns";

// Mock Data
const mockPayrollData = [
  {
    id: 1,
    name: "John Doe",
    salary: 50000,
    month: "January",
    year: 2025,
    paymentDate: null,
    isPaid: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    salary: 60000,
    month: "February",
    year: 2025,
    paymentDate: null,
    isPaid: false,
  },
  {
    id: 3,
    name: "Alice Brown",
    salary: 45000,
    month: "March",
    year: 2025,
    paymentDate: null,
    isPaid: false,
  },
  {
    id: 4,
    name: "Bob Johnson",
    salary: 75000,
    month: "April",
    year: 2025,
    paymentDate: "2025-01-12",
    isPaid: true,
  },
];

export default function Payroll() {
  const [payrollData, setPayrollData] = useState(mockPayrollData);

  const handlePay = (id) => {
    const currentDate = format(new Date(), "yyyy-MM-dd"); // Format as YYYY-MM-DD
    setPayrollData((prev) =>
      prev.map((record) =>
        record.id === id
          ? { ...record, paymentDate: currentDate, isPaid: true }
          : record
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-text mb-6">Employee Payroll</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Salary
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Month
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Year
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Payment Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Pay
              </th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((record) => (
              <tr key={record.id} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {record.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {record.salary}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {record.month}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {record.year}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {record.paymentDate ? record.paymentDate : "Pending"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {record.isPaid ? (
                    <button
                      className="bg-gray-300 text-gray-600 px-3 py-1 rounded cursor-not-allowed"
                      disabled
                    >
                      Paid
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handlePay(record.id)}
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
