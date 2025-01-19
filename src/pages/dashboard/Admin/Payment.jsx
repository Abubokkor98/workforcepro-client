import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gatway_PK);
console.log(stripePromise);
export default function Payment() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: employee = {}, isPending } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments/${id}`);
      return data;
    },
  });

  if (isPending) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">Loading...</div>
    );
  }

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm employee={employee}></CheckoutForm>
      </Elements>
    </div>
  );
}
