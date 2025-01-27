import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

// Set the app element for React Modal
Modal.setAppElement("#root");

export default function PayModal({ isOpen, onClose, employee, onPay }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlePay = (data) => {
    onPay(data);
    reset();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Pay Employee"
      className="modal bg-white rounded-lg shadow-lg p-6 w-96 mx-auto mt-20"
      overlayClassName="modal-overlay bg-gray-500 bg-opacity-50 fixed inset-0"
    >
      {employee && (
        <div>
          <h2 className="text-xl font-bold text-text mb-4">
            Pay {employee.name}
          </h2>
          <p className="mb-4">Salary: ${employee.salary}</p>
          <form onSubmit={handleSubmit(handlePay)}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="month">
                Month
              </label>
              <select
                id="month"
                {...register("month", { required: "Month is required" })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Month</option>
                {[
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
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              {errors.month && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.month.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="year">
                Year
              </label>
              <input
                id="year"
                type="number"
                {...register("year", {
                  required: "Year is required",
                })}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                }}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter Year"
              />
              {errors.year && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.year.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md w-full hover:bg-primary-dark active:scale-95"
            >
              Pay
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
}
