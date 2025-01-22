import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import PayModal from "./PayModal";

export default function EmployeeList() {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeForModal, setEmployeeForModal] = useState(null);

  const {
    data: employeeData = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?role=Employee`);
      return data;
    },
  });

  const handleVerified = async (user) => {
    const updatedUser = { isVerified: !user.isVerified };
    const { data: updated } = await axiosSecure.patch(
      `/users/${user._id}`,
      updatedUser
    );
    if (updated.modifiedCount > 0) {
      updatedUser.isVerified
        ? toast.success("User successfully verified!")
        : toast.error("User unverified successfully!");
      refetch();
    }
  };

  const handlePayRequest = async (data) => {
    const newPayment = {
      name: employeeForModal.name,
      email: employeeForModal.email,
      salary: employeeForModal.salary,
      month: data.month,
      year: data.year,
      paymentStatus: "pending",
      transactionId: "",
      payingDate: "",
    };

    try {
      // Send payment request to the server
      const response = await axiosSecure.post("/payments", newPayment);
      if (response.status === 201) {
        toast.success("Payment request sent to Admin");
        setIsModalOpen(false);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(
          `Payment for ${employeeForModal.name} already exists for ${data.month} ${data.year}.`
        );
      } else {
        toast.error("Failed to send payment request.");
      }
    }
  };

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
            onClick={() => handleVerified(row.original)}
          >
            {row.original.isVerified ? (
              <AiOutlineCheck size={20} />
            ) : (
              <AiOutlineClose size={20} />
            )}
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
                setEmployeeForModal(row.original);
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
          <Link to={`/dashboard/employee-details/${row.original.email}`}>
            <button className="px-4 py-2 bg-accent text-white rounded-md">
              Details
            </button>
          </Link>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: employeeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>Employees | WorkForce Pro</title>
      </Helmet>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Employee List</h2>

        {/* Table */}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PayModal */}
        <PayModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          employee={employeeForModal}
          onPay={handlePayRequest}
        />
      </div>
    </>
  );
}
