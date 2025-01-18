import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function Payroll() {
  const axiosSecure = useAxiosSecure();

  const {
    data: payroll = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["payroll"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payments");
      return data;
    },
  });

  // Handle payment
  const handlePay = async (employee) => {
    const currentDate = format(new Date(), "yyyy-MM-dd");
    const updatedPayment = {
      paymentStatus: "paid",
      payingDate: currentDate,
    };

    try {
      const { data: updated } = await axiosSecure.patch(
        `/payments/${employee._id}`,
        updatedPayment
      );

      if (updated.modifiedCount > 0) {
        toast.success(`${employee.name} has been successfully paid.`);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update payment status");
    }
  };

  if (isPending) {
    return <LoadingSpinner></LoadingSpinner>;
  }
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
            {payroll.map((employee) => (
              <tr key={employee._id} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {employee.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {employee.salary}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {employee.month}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {employee.year}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {employee.payingDate ? employee.payingDate : "Pending"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {employee.paymentStatus === "paid" ? (
                    <button
                      className="bg-gray-300 text-gray-600 px-3 py-1 rounded cursor-not-allowed"
                      disabled
                    >
                      Paid
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handlePay(employee)}
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
