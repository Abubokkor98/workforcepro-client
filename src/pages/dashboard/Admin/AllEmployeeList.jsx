import React, { useState } from "react";
import Modal from "react-modal";

// Mock Employee Data
const mockEmployees = [
  {
    id: 1,
    name: "John Doe",
    designation: "Employee",
    isHR: false,
    salary: 50000,
    isFired: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "HR",
    isHR: true,
    salary: 70000,
    isFired: false,
  },
  {
    id: 3,
    name: "Alice Brown",
    designation: "Employee",
    isHR: false,
    salary: 45000,
    isFired: false,
  },
  {
    id: 4,
    name: "Bob Johnson",
    designation: "HR",
    isHR: true,
    salary: 75000,
    isFired: true,
  },
];

export default function AllEmployeeList() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleMakeHR = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, isHR: true, designation: "HR" } : emp
      )
    );
  };

  const handleFireEmployee = (id) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, isFired: true } : emp))
    );
    setModalIsOpen(false);
  };

  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedEmployee(null);
  };

  const handleSalaryChange = (id, newSalary) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, salary: newSalary } : emp))
    );
  };
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
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {emp.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {emp.designation}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {!emp.isHR ? (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleMakeHR(emp.id)}
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
                      onClick={() => handleOpenModal(emp)}
                    >
                      Fire
                    </button>
                  ) : (
                    <span className="text-gray-500 italic">Fired</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {!emp.isFired ? (
                    <input
                      type="number"
                      className="border border-gray-300 rounded px-2 py-1 w-20 text-sm"
                      value={emp.salary}
                      onChange={(e) =>
                        handleSalaryChange(emp.id, parseInt(e.target.value))
                      }
                    />
                  ) : (
                    <span className="text-gray-500 italic">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Confirmation Modal"
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
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => handleFireEmployee(selectedEmployee.id)}
          >
            Fire
          </button>
        </div>
      </Modal>
    </div>
  );
}
