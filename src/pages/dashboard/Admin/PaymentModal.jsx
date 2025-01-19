import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import useAuth from "../../../customHooks/useAuth";

export default function PaymentModal({ isOpen, onClose, employee, refetch }) {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isCardComplete, setIsCardComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { name, salary, month, year } = employee || {};

  useEffect(() => {
    if (salary > 0) {
      axiosSecure.post("/create-payment-intent", { salary }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, salary]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const currentDate = moment().format("hh:mm A, MMMM Do, YYYY");
      const updatedPayment = {
        paymentStatus: "paid",
        transactionId: paymentIntent.id,
        payingDate: currentDate,
        status: "pending",
      };

      const res = await axiosSecure.patch(
        `/payments/${employee._id}`,
        updatedPayment
      );
      if (res.data?.modifiedCount > 0) {
        toast.success("Thank you for the payment");
        refetch();
        onClose();
      }
    }
  };

  //modal close
  const handleClose = () => {
    setError("");
    setIsCardComplete(false);
    onClose();
  };

  //card input listener function
  const handleCardChange = (e) => {
    setError(e.error ? e.error.message : "");
    setIsCardComplete(e.complete);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Payment for {name}</h2>
        <p className="text-gray-700 mb-6">
          Salary: <span className="font-semibold">${salary}</span> | Month:{" "}
          <span className="font-semibold">{month}</span> | Year:{" "}
          <span className="font-semibold">{year}</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            onChange={handleCardChange}
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!stripe || !clientSecret || !isCardComplete}
              className={`${
                stripe && clientSecret && isCardComplete
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white px-4 py-2 rounded`}
            >
              Pay
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
