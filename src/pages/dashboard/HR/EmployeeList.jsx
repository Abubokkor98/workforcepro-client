import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Modal from "react-modal";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function EmployeeList() {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeForModal, setEmployeeForModal] = useState(null);
  const { register, handleSubmit, reset } = useForm();

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

  // handle verification toggle
  const handleVerified = async (user) => {
    const updatedUser = {
      isVerified: !user.isVerified,
    };
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

  // Modal Handling
  const closeModal = () => {
    setIsModalOpen(false);
    setEmployeeForModal(null);
    reset();
  };

  // handle payrequest to the admin
  const handlePay = async (data) => {
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
    // post payment request to the db
    const { data: payRequest } = await axiosSecure.post(
      "/payments",
      newPayment
    );
    // console.log(payRequest);
    if (payRequest.insertedId) {
      toast.success("Payment request send to Admin");
    }
    closeModal();
  };

  // Table Columns
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
  //Table Instance
  const table = useReactTable({
    data: employeeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>Employee List | WorkForce Pro</Helmet>
      <h2 className="text-2xl font-bold text-text mb-4">Employee List</h2>

      {/*table */}
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

      {/* modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Pay Employee"
        className="modal bg-white rounded-lg shadow-lg p-6 w-96 mx-auto mt-20"
        overlayClassName="modal-overlay bg-gray-500 bg-opacity-50 fixed inset-0"
      >
        {employeeForModal && (
          <div>
            <h2 className="text-xl font-bold text-text mb-4">
              Pay {employeeForModal.name}
            </h2>
            <p className="mb-4">Salary: ${employeeForModal.salary}</p>
            <form onSubmit={handleSubmit(handlePay)}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="month"
                >
                  Month
                </label>
                <select
                  id="month"
                  {...register("month", { required: true })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
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
                  {...register("year", { required: true })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter Year"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md w-full"
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
