import React, { useState, useEffect } from "react";

// Mock Data for Employees' Progress
const mockWorkRecords = [
  {
    id: 1,
    name: "John Doe",
    month: "January",
    year: 2023,
    work: "Developed new features for the HR system.",
  },
  {
    id: 2,
    name: "Jane Smith",
    month: "February",
    year: 2023,
    work: "Fixed bugs and optimized performance.",
  },
  {
    id: 3,
    name: "Alice Brown",
    month: "January",
    year: 2023,
    work: "Completed UI designs for the dashboard.",
  },
  {
    id: 4,
    name: "John Doe",
    month: "March",
    year: 2023,
    work: "Implemented authentication and authorization.",
  },
  {
    id: 5,
    name: "Alice Brown",
    month: "February",
    year: 2023,
    work: "Tested the API endpoints and reported issues.",
  },
];

// Dropdown options for months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ProgressPage() {
  const [workRecords, setWorkRecords] = useState(mockWorkRecords);
  const [filteredRecords, setFilteredRecords] = useState(mockWorkRecords);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    // Filter logic
    const filtered = workRecords.filter((record) => {
      const matchesEmployee = selectedEmployee
        ? record.name === selectedEmployee
        : true;
      const matchesMonth = selectedMonth
        ? record.month === selectedMonth
        : true;
      return matchesEmployee && matchesMonth;
    });
    setFilteredRecords(filtered);
  }, [selectedEmployee, selectedMonth, workRecords]);

  // Extract unique employee names for the dropdown
  const employeeNames = [...new Set(workRecords.map((record) => record.name))];
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-text mb-6">Progress Records</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Employee Name Filter */}
        <div>
          <label
            htmlFor="employee"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by Employee
          </label>
          <select
            id="employee"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">All Employees</option>
            {employeeNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Month Filter */}
        <div>
          <label
            htmlFor="month"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by Month
          </label>
          <select
            id="month"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Month
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Year
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Work Description
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {record.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {record.month}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {record.year}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {record.work}
                </td>
              </tr>
            ))}
            {filteredRecords.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
