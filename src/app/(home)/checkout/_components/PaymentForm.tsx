"use client";

import useCheckoutData from "@/hooks/useCheckoutData";
import useTransaction from "@/hooks/useTransaction";
import { rupiahFormat, SEAT_VALUES, type SeatValuesType } from "@/lib/utils";
import type { User } from "lucia";
import { useMemo, useState } from "react";
import {
  CreditCard,
  Wallet,
  Smartphone,
  User as UserIcon,
  Calendar,
  Lock,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from "lucide-react";
import PaymentMethodTabs from "./PaymentMethodTabs";

interface PaymentFormProps {
  user: User | null;
}

const PaymentForm = ({ user }: PaymentFormProps) => {
  const { data } = useCheckoutData();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet" | "apple">(
    "card"
  );

  const selectedSeat = useMemo(() => {
    return SEAT_VALUES[(data?.seat as SeatValuesType) ?? "ECONOMY"];
  }, [data?.seat]);

  const totalPrice = useMemo(() => {
    if (!data?.flightDetail?.price) return 0;
    return data.flightDetail.price + selectedSeat.additionalPrice;
  }, [data?.flightDetail?.price, selectedSeat.additionalPrice]);

  const { isLoading, payTransaction } = useTransaction({ user });

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-sky-primary/5 border border-gray-100">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-2">
          Payment Details
        </h2>
        <p className="text-gray-500 text-lg">
          Complete your purchase securely.
        </p>
      </div>

      {/* Payment Method Tabs */}
      <PaymentMethodTabs
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      {/* Card Payment Form */}
      {paymentMethod === "card" && (
        <form className="flex flex-col gap-6">
          {/* Card Number */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-dark ml-2">
              Card Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <CreditCard className="w-5 h-5 text-gray-400" />
              </div>
              <input
                className="w-full bg-gray-50 text-text-dark placeholder:text-gray-400 font-medium rounded-2xl py-4 pl-12 pr-4 border border-gray-200 focus:border-sky-primary focus:ring-4 focus:ring-sky-primary/10 transition-all duration-300 text-lg"
                placeholder="0000 0000 0000 0000"
                type="text"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                {/* Card Brand Icon Placeholder */}
                <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-500">VISA</div>
              </div>
            </div>
          </div>

          {/* Cardholder Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-dark ml-2">
              Cardholder Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <UserIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                className="w-full bg-gray-50 text-text-dark placeholder:text-gray-400 font-medium rounded-2xl py-4 pl-12 pr-4 border border-gray-200 focus:border-sky-primary focus:ring-4 focus:ring-sky-primary/10 transition-all duration-300"
                placeholder="e.g. John Doe"
                type="text"
                defaultValue={user?.name || ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Expiry Date */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-dark ml-2">
                Expiry Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  className="w-full bg-gray-50 text-text-dark placeholder:text-gray-400 font-medium rounded-2xl py-4 pl-12 pr-4 border border-gray-200 focus:border-sky-primary focus:ring-4 focus:ring-sky-primary/10 transition-all duration-300"
                  placeholder="MM/YY"
                  type="text"
                />
              </div>
            </div>

            {/* CVC */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-dark ml-2">
                CVC / CVV
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  className="w-full bg-gray-50 text-text-dark placeholder:text-gray-400 font-medium rounded-2xl py-4 pl-12 pr-4 border border-gray-200 focus:border-sky-primary focus:ring-4 focus:ring-sky-primary/10 transition-all duration-300"
                  placeholder="123"
                  type="text"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* E-Wallet / QRIS Message */}
      {paymentMethod !== "card" && (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
            {paymentMethod === "wallet" ? (
              <Wallet className="w-10 h-10 text-sky-primary" />
            ) : (
              <Smartphone className="w-10 h-10 text-sky-primary" />
            )}
          </div>
          <h3 className="text-lg font-bold text-text-dark mb-2">
            {paymentMethod === "wallet" ? "E-Wallet Payment" : "QRIS Payment"}
          </h3>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            You will be redirected to complete payment via{" "}
            {paymentMethod === "wallet" ? "your e-wallet" : "QRIS scan"}.
          </p>
        </div>
      )}

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 py-4 mt-6 bg-green-50 rounded-xl border border-green-100">
        <ShieldCheck className="w-5 h-5 text-green-600" />
        <span className="text-sm text-green-700 font-bold">
          100% Secure Payment
        </span>
      </div>

      {/* Pay Button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={payTransaction}
          disabled={isLoading}
          className="group relative w-full h-16 bg-sky-primary hover:bg-sky-600 text-white rounded-full font-bold text-xl shadow-lg shadow-sky-primary/30 hover:shadow-xl hover:shadow-sky-primary/40 transition-all transform hover:-translate-y-1 active:translate-y-0 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Pay {rupiahFormat(totalPrice)}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
