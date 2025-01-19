import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import useAuth from "../../../customHooks/useAuth";
import { useState } from "react";

export default function PaymentHistory() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Items per page

  // Fetch payment data
  const { data: payments = [], isPending } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      // Ensure the hook runs even if email is not present
      const response = await axiosSecure.get(`/payments/email/${user?.email}`);
      return response.data;
    },
  });

  // Show loading state
  if (isPending) {
    return <p>Loading...</p>;
  }

  // Pagination state

  const pageCount = Math.ceil(payments.length / itemsPerPage);
  const displayedPayments = payments.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-text mb-4">Payment History</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="px-6 py-3">Month, Year</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Transaction ID</th>
              <th className="px-6 py-3">Paying date</th>
            </tr>
          </thead>
          <tbody>
            {displayedPayments.map((payment, index) => (
              <tr
                key={payment._id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                } `}
              >
                <td className="px-6 py-3">
                  {payment.month}, {payment.year}
                </td>
                <td className="px-6 py-3">${payment.salary}</td>
                <td className="px-6 py-3">
                  {payment.paymentStatus === "paid" ? "Paid " : "Not Paid"}
                </td>
                <td className="px-6 py-3">{payment.transactionId || "N/A"}</td>
                <td className="px-6 py-3">{payment.payingDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination UI */}
      <div className="mt-6">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination flex justify-center gap-4"}
          activeClassName={"text-accent font-bold"}
          previousClassName={"px-4 py-2 bg-primary text-white rounded-md"}
          nextClassName={"px-4 py-2 bg-primary text-white rounded-md"}
          pageClassName={"px-3 py-1 rounded-md"}
          breakLabel={"..."}
        />
      </div>
    </div>
  );
}
