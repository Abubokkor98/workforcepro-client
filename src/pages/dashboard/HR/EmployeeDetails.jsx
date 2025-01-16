import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock API call
const fetchEmployeeDetails = async (slug) => {
  // Simulate an API call to get employee details
  const mockData = {
    name: "John Doe",
    photoURL: "https://via.placeholder.com/150",
    designation: "Software Engineer",
    salaryHistory: [
      { month: "January", year: 2023, salary: 5000 },
      { month: "February", year: 2023, salary: 5000 },
      { month: "March", year: 2023, salary: 5000 },
      { month: "April", year: 2023, salary: 5000 },
    ],
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 1000); // Simulate API delay
  });
};
export default function EmployeeDetails() {
  const { slug } = useParams(); // Get slug from URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = await fetchEmployeeDetails(slug);
      setEmployee(data);
      setLoading(false);
    };
    fetchDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">Loading...</div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center mt-10 text-lg font-semibold text-red-500">
        Employee not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-text mb-6">Employee Details</h2>

      <div className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-md rounded-lg p-6 mb-8">
        <img
          src={employee.photoURL}
          alt={employee.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-bold text-primary">{employee.name}</h3>
          <p className="text-md text-gray-600">{employee.designation}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-bold text-text mb-4">Salary History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={employee.salaryHistory.map((item) => ({
              ...item,
              label: `${item.month} ${item.year}`,
            }))}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              label={{ value: "Month-Year", position: "insideBottom", dy: 10 }}
            />
            <YAxis
              label={{ value: "Salary", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Bar dataKey="salary" fill="#75939e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
