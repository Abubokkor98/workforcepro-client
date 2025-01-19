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
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function EmployeeDetails() {
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: employeeData = {}, isPending } = useQuery({
    queryKey: ["employee", email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/employee-details/${email}`);
      return data;
    },
  });
  const { userDetails = {}, salaryHistory = [] } = employeeData;

  if (isPending) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-text mb-6">Employee Details</h2>

      <div className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-md rounded-lg p-6 mb-8">
        <img
          src={userDetails.photo}
          alt={userDetails.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-bold text-primary">{userDetails.name}</h3>
          <p className="text-md text-gray-600">{userDetails.designation}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-bold text-text mb-4">Salary History</h3>
        {salaryHistory.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={salaryHistory.map((item) => ({
                ...item,
                label: `${item.month} ${item.year}`,
              }))}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                label={{
                  value: "Month-Year",
                  position: "insideBottom",
                  dy: 10,
                }}
              />
              <YAxis
                label={{ value: "Salary", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Bar dataKey="salary" fill="#75939e" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-lg font-semibold text-red-500">
            salary history unavailable.
          </div>
        )}
      </div>
    </div>
  );
}
