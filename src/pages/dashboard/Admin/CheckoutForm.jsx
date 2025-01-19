import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import useAuth from "../../../customHooks/useAuth";
import { format } from "date-fns";

export default function CheckoutForm({ employee }) {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    name,
    email,
    salary,
    month,
    year,
    paymentStatus,
    transactionId,
    payingDate,
  } = employee;

  useEffect(() => {
    if (salary > 0) {
      axiosSecure
        .post("/create-payment-intent", { salary: salary })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, salary]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else if (paymentIntent.status === "succeeded") {

      const currentDate = format(new Date(), "yyyy-MM-dd");
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
        navigate("/dashboard/payroll");
      }
    }
  };

  return (
    <div className="bg-background text-text p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Payment for {name}
      </h2>
      <p className="text-secondary mb-6">
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
                color: "#0c0f11", 
                "::placeholder": {
                  color: "#b1aac4", 
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="bg-primary text-white px-4 py-2 rounded hover:bg-accent disabled:opacity-50"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
