import Modal from "react-modal";
import { useForm } from "react-hook-form";
// Set the app element for React Modal
Modal.setAppElement("#root");

export default function PayModal({ isOpen, onClose, employee, onPay }) {
  const { register, handleSubmit, reset } = useForm();

  const handlePay = (data) => {
    onPay(data); // Call the `onPay` function passed from the parent
    reset(); // Reset the form
    onClose(); // Close the modal
  };
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
              <label className="block text-sm font-medium mb-1" htmlFor="year">
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
  );
}
