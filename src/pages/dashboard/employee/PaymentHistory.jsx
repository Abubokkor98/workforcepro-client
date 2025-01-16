import ReactPaginate from "react-paginate";

export default function PaymentHistory() {
  const mockPayments = [
    { month: "January", year: 2025, amount: 1000, transactionId: "abc123" },
    { month: "February", year: 2025, amount: 1200, transactionId: "def456" },
    { month: "March", year: 2025, amount: 1500, transactionId: "ghi789" },
    { month: "April", year: 2025, amount: 1700, transactionId: "jkl012" },
    { month: "May", year: 2025, amount: 1300, transactionId: "mno345" },
  ];
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-text mb-4">Payment History</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="px-6 py-3">Month, Year</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {mockPayments.map((payment, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                } hover:bg-accent`}
              >
                <td className="px-6 py-3">
                  {payment.month}, {payment.year}
                </td>
                <td className="px-6 py-3">${payment.amount}</td>
                <td className="px-6 py-3">{payment.transactionId}</td>
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
          pageCount={2} // Change this as per your data
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
