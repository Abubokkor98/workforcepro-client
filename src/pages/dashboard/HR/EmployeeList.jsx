import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Modal from "react-modal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";

export default function EmployeeList() {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch employees with role 'Employee' via useQuery
  const { data: employeeData = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?role=Employee`);
      return data;
    },
  });

  // Table Columns Definition
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Verified",
        accessorKey: "isVerified",
        cell: ({ row }) => (
          <button
            className={`px-3 py-1 rounded-md ${
              row.original.isVerified
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
            onClick={() => console.log("Toggle Verified for:", row.original)}
          >
            {row.original.isVerified ? "✅" : "❌"}
          </button>
        ),
      },
      {
        header: "Bank Account",
        accessorKey: "bank_account_no",
      },
      {
        header: "Salary",
        accessorKey: "salary",
        cell: ({ row }) => `$${row.original.salary.toLocaleString()}`,
      },
      {
        header: "Pay",
        cell: ({ row }) => (
          <button
            className={`px-4 py-2 rounded-md ${
              row.original.isVerified
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => {
              if (row.original.isVerified) {
                setSelectedEmployee(row.original);
                setIsModalOpen(true);
              }
            }}
            disabled={!row.original.isVerified}
          >
            Pay
          </button>
        ),
      },
      {
        header: "Details",
        cell: ({ row }) => (
          <button
            className="px-4 py-2 bg-accent text-white rounded-md"
            onClick={() => console.log("Go to Details for:", row.original)}
          >
            Details
          </button>
        ),
      },
    ],
    []
  );

  // React Table Instance
  const table = useReactTable({
    data: employeeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Modal Handling
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-text mb-4">Employee List</h2>

      {/* Employee Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-primary text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-3 text-left">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pay Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Pay Employee"
        className="modal bg-white rounded-lg shadow-lg p-6 w-96 mx-auto mt-20"
        overlayClassName="modal-overlay bg-gray-500 bg-opacity-50 fixed inset-0"
      >
        {selectedEmployee && (
          <div>
            <h2 className="text-xl font-bold text-text mb-4">
              Pay {selectedEmployee.name}
            </h2>
            <p className="mb-4">Salary: ${selectedEmployee.salary}</p>
            <form>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="month"
                >
                  Month
                </label>
                <input
                  id="month"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter Month"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="year"
                >
                  Year
                </label>
                <input
                  id="year"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter Year"
                />
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-primary text-white rounded-md w-full"
                onClick={closeModal}
              >
                Pay
              </button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}
