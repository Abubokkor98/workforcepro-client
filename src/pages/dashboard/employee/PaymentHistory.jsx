import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import useAuth from "../../../customHooks/useAuth";
import { useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

export default function PaymentHistory() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  //fetch data
  const { data: payments = [], isPending } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/payments/email/${user?.email}`);
      return response.data;
    },
  });

  if (isPending) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  //descending sort functionality
  const sortedPayments = [...payments].sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
    }
    // if the years are same
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
    return months.indexOf(b.month) - months.indexOf(a.month);
  });

  // Pagination
  const pageCount = Math.ceil(sortedPayments.length / itemsPerPage);
  const displayedPayments = sortedPayments.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>
        <title>Payment History | WorkForce Pro</title>
      </Helmet>
      <h2 className="text-2xl font-bold text-primary mb-4">Payment History</h2>
      <div className="overflow-x-auto rounded-lg lg:h-80">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="px-6 py-3">Month, Year</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Transaction ID</th>
              <th className="px-6 py-3">Paying Date</th>
            </tr>
          </thead>
          <tbody>
            {displayedPayments.map((payment, index) => (
              <tr
                key={payment._id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-3">
                  {payment.month}, {payment.year}
                </td>
                <td className="px-6 py-3">${payment.salary}</td>
                <td className="px-6 py-3">
                  {payment.paymentStatus === "paid" ? "Paid" : "Not Paid"}
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
