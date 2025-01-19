import { useRef, useState } from "react";
import Modal from "react-modal";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function AllEmployeeList() {
  const axiosSecure = useAxiosSecure();
  const [fireModalIsOpen, setFireModalIsOpen] = useState(false);
  const [salaryModalIsOpen, setSalaryModalIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const salaryInputRef = useRef(null);

  const {
    data: employees = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?isVerified=true`);
      return data;
    },
  });

  // handleMakeHR
  const handleMakeHR = async (user) => {
    // console.log(user);
    const updatedUser = {
      role: "HR",
    };
    const { data: updated } = await axiosSecure.patch(
      `/users/${user._id}`,
      updatedUser
    );
    if (updated.modifiedCount > 0) {
      toast.success(`${user.name} is now an HR!`);
      refetch();
    }
  };

  // handle fire
  const handleFire = async (user) => {
    const updatedUser = {
      isFired: true,
    };
    // console.log(user);
    const { data: updated } = await axiosSecure.patch(
      `/users/${user._id}`,
      updatedUser
    );

    if (updated.modifiedCount > 0) {
      setFireModalIsOpen(false);
      toast.error(`${user.name} has been fired.`);
      refetch();
    }
  };

  // fire modal
  const handleOpenFireModal = (employee) => {
    setSelectedEmployee(employee);
    setFireModalIsOpen(true);
  };
  const handleCloseFireModal = () => {
    setFireModalIsOpen(false);
    setSelectedEmployee(null);
  };

  // salary modal
  const handleOpenSalaryModal = (employee) => {
    setSelectedEmployee(employee);
    setSalaryModalIsOpen(true);
  };
  const handleCloseSalaryModal = () => {
    setSalaryModalIsOpen(false);
    setSelectedEmployee(null);
  };

  const handleConfirmAdjustSalary = async () => {
    const newSalary = parseInt(salaryInputRef.current.value);
    if (selectedEmployee.salary > newSalary) {
      toast.error("Salary cannot be decreased!");
      return;
    }
    const updatedUser = {
      salary: newSalary,
    };
    const { data: updated } = await axiosSecure.patch(
      `/users/${selectedEmployee._id}`,
      updatedUser
    );
    if (updated.modifiedCount > 0) {
      setSalaryModalIsOpen(false);
      toast.success(
        `${selectedEmployee.name}'s salary updated to $${newSalary}!`
      );
      refetch();
    }
  };

  if (isPending) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-text mb-6">
        All Verified Employees
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Designation
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Make HR
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Fire
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Salary
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Adjust Salary
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {emp.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {emp.designation}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {emp.role !== "HR" ? (
                    <button
                      className={`bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ${
                        emp.isFired ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      onClick={() => handleMakeHR(emp)}
                      disabled={emp.isFired}
                    >
                      Make HR
                    </button>
                  ) : (
                    <span className="text-green-500 font-medium">
                      Already HR
                    </span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {!emp.isFired ? (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleOpenFireModal(emp)}
                    >
                      Fire
                    </button>
                  ) : (
                    <span className="text-gray-500 italic">Fired</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {emp.salary}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {!emp.isFired ? (
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => handleOpenSalaryModal(emp)}
                    >
                      Adjust Salary
                    </button>
                  ) : (
                    <span className="text-gray-500 italic">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* fire modal */}
      <Modal
        isOpen={fireModalIsOpen}
        onRequestClose={handleCloseFireModal}
        contentLabel="Fire Confirmation Modal"
        className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to fire{" "}
          <span className="font-bold">{selectedEmployee?.name}</span>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={handleCloseFireModal}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => handleFire(selectedEmployee)}
          >
            Fire
          </button>
        </div>
      </Modal>

      {/* adjust salary modal */}
      <Modal
        isOpen={salaryModalIsOpen}
        onRequestClose={handleCloseSalaryModal}
        contentLabel="Adjust Salary Modal"
        className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Adjust Salary</h2>
        {selectedEmployee && (
          <div className="space-y-4">
            <p className="text-gray-700">
              <span className="font-bold">Name:</span> {selectedEmployee.name}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Email:</span> {selectedEmployee.email}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Designation:</span>{" "}
              {selectedEmployee.designation}
            </p>
            <div>
              <label
                htmlFor="newSalary"
                className="block text-gray-700 font-medium mb-2"
              >
                New Salary:
              </label>
              <input
                type="number"
                ref={salaryInputRef}
                defaultValue={selectedEmployee.salary}
                id="newSalary"
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          </div>
        )}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={handleCloseSalaryModal}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleConfirmAdjustSalary}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
}
