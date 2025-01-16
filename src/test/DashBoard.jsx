import React from 'react'
import { Fade } from 'react-awesome-reveal'

export default function DashBoard() {
  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header */}
      <Fade direction="down" duration={600}>
        <div className="text-primary text-3xl font-bold mb-6">
          Welcome Back, Admin!
        </div>
        <p className="text-secondary text-lg">
          Here's a quick overview of your workforce.
        </p>
      </Fade>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {/* Total Employees */}
        <div className="bg-primary text-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold">Total Employees</h3>
          <p className="text-4xl font-bold mt-2">1,245</p>
        </div>
        {/* Active Tasks */}
        <div className="bg-secondary text-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold">Active Tasks</h3>
          <p className="text-4xl font-bold mt-2">78</p>
        </div>
        {/* Departments */}
        <div className="bg-accent text-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold">Departments</h3>
          <p className="text-4xl font-bold mt-2">12</p>
        </div>
        {/* Attendance */}
        <div className="bg-text text-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold">Today's Attendance</h3>
          <p className="text-4xl font-bold mt-2">92%</p>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Overview */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-primary text-xl font-semibold mb-4">
            Employee Overview
          </h3>
          <div className="overflow-auto max-h-64">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-accent text-white">
                  <th className="p-3">Name</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-background even:bg-secondary/10">
                  <td className="p-3">John Doe</td>
                  <td className="p-3">HR</td>
                  <td className="p-3">Manager</td>
                  <td className="p-3 text-green-600 font-semibold">Active</td>
                </tr>
                <tr className="odd:bg-background even:bg-secondary/10">
                  <td className="p-3">Jane Smith</td>
                  <td className="p-3">IT</td>
                  <td className="p-3">Developer</td>
                  <td className="p-3 text-red-600 font-semibold">Inactive</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-primary text-xl font-semibold mb-4">
            Notifications
          </h3>
          <ul className="space-y-3">
            <li className="bg-background p-3 rounded-md">
              New employee <strong>Emily Johnson</strong> added to IT department.
            </li>
            <li className="bg-background p-3 rounded-md">
              Weekly attendance report is available.
            </li>
            <li className="bg-background p-3 rounded-md">
              Upcoming meeting: <strong>Team Leads</strong> at 3 PM.
            </li>
            {/* Add more notifications as needed */}
          </ul>
        </div>
      </div>
    </div>
  )
}

/**  payment history */
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ReactPaginate from "react-paginate";

// const PaymentHistory = () => {
//   const [payments, setPayments] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage] = useState(5); // Change this value to increase/decrease items per page
//   const [loading, setLoading] = useState(true);

//   // Fetch payment history
//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("/api/payment-history"); // Update with your API endpoint
//         const sortedPayments = response.data.sort((a, b) =>
//           new Date(a.date) - new Date(b.date)
//         );
//         setPayments(sortedPayments);
//       } catch (error) {
//         console.error("Failed to fetch payment history:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   // Paginate payments
//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const displayedPayments = payments.slice(startIndex, endIndex);

//   // Handle page change
//   const handlePageClick = (event) => {
//     setCurrentPage(event.selected);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-primary text-xl font-semibold">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h2 className="text-2xl font-bold text-text mb-4">Payment History</h2>
//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="min-w-full bg-white rounded-lg shadow-md">
//           <thead>
//             <tr className="bg-primary text-white text-left">
//               <th className="px-6 py-3">Month, Year</th>
//               <th className="px-6 py-3">Amount</th>
//               <th className="px-6 py-3">Transaction ID</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedPayments.length > 0 ? (
//               displayedPayments.map((payment, index) => (
//                 <tr
//                   key={index}
//                   className={`border-b ${
//                     index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
//                   } hover:bg-accent`}
//                 >
//                   <td className="px-6 py-3">
//                     {payment.month}, {payment.year}
//                   </td>
//                   <td className="px-6 py-3">${payment.amount}</td>
//                   <td className="px-6 py-3">{payment.transactionId}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={3}
//                   className="text-center text-red-500 font-medium py-4"
//                 >
//                   No payment history found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       {payments.length > itemsPerPage && (
//         <div className="mt-6">
//           <ReactPaginate
//             previousLabel={"Previous"}
//             nextLabel={"Next"}
//             pageCount={Math.ceil(payments.length / itemsPerPage)}
//             onPageChange={handlePageClick}
//             containerClassName={"pagination flex justify-center gap-4"}
//             activeClassName={"text-accent font-bold"}
//             previousClassName={"px-4 py-2 bg-primary text-white rounded-md"}
//             nextClassName={"px-4 py-2 bg-primary text-white rounded-md"}
//             pageClassName={"px-3 py-1 rounded-md"}
//             breakLabel={"..."}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentHistory;

