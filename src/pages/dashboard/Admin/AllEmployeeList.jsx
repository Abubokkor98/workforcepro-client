import { useRef, useState } from "react";
import Modal from "react-modal";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";
import avatar from "../../../assets/default-avatar.png";
import { Helmet } from "react-helmet-async";

export default function AllEmployeeList() {
  const axiosSecure = useAxiosSecure();
  const [fireModalIsOpen, setFireModalIsOpen] = useState(false);
  const [salaryModalIsOpen, setSalaryModalIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isGridView, setIsGridView] = useState(false); // Toggle state
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
    const updatedUser = { role: "HR" };
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
    const updatedUser = { isFired: true };
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
    const updatedUser = { salary: newSalary };
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

  if (isPending) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>
        <title>Verified Employees | WorkForce Pro</title>
      </Helmet>
      <h2 className="text-2xl font-bold text-primary mb-6">
        All Verified Employees
      </h2>

      {/* Toggle Button */}
      <button
        onClick={() => setIsGridView((prev) => !prev)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {isGridView ? "Table View" : "Grid View"}
      </button>

      {/* Table View */}
      {!isGridView ? (
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
      ) : (
        // Card Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <div
              key={emp._id}
              className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <div className="mb-4 flex justify-center">
                <img
                  src={emp.photo || avatar}
                  alt={`${emp.name}'s profile`}
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
              </div>

              <h3 className="font-semibold text-lg text-center">{emp.name}</h3>
              <p
                className={`text-center font-medium ${
                  emp.role === "HR" ? "text-green-500" : "text-blue-500"
                }`}
              >
                {emp.role === "HR" ? "HR" : "Employee"}
              </p>
              <p className="text-center text-sm text-gray-600">
                <span className="font-bold">Designation:</span>{" "}
                {emp.designation}
              </p>

              <p className="text-center text-sm text-gray-600">
                <span className="font-bold">Salary:</span> ${emp.salary}
              </p>

              <div className="mt-4 flex justify-between gap-2">
                {emp.isFired ? (
                  <span className="text-red-500 italic">Fired</span>
                ) : (
                  <>
                    {emp.role !== "HR" && (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => handleMakeHR(emp)}
                      >
                        Make HR
                      </button>
                    )}

                    {emp.role !== "HR" && (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        onClick={() => handleOpenFireModal(emp)}
                      >
                        Fire
                      </button>
                    )}
                  </>
                )}

                {emp.isFired && emp.role !== "HR" && (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                  >
                    Make HR
                  </button>
                )}

                {emp.role === "HR" && !emp.isFired && (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleOpenFireModal(emp)}
                  >
                    Fire
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

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
