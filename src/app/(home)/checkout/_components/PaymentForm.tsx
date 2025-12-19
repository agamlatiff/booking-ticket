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
    <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl shadow-gray-200/50 border border-white">
      {/* Payment Method Tabs */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-text-dark mb-3 ml-2">
          Select Payment Method
        </label>
        <div className="flex p-1.5 bg-gray-100 rounded-full gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full min-w-[140px] transition-all ${paymentMethod === "card"
                ? "bg-white shadow-sm text-sky-primary border border-gray-100"
                : "text-gray-500 hover:bg-white/50"
              }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-sm font-bold">Card</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("wallet")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full min-w-[140px] transition-all ${paymentMethod === "wallet"
                ? "bg-white shadow-sm text-sky-primary border border-gray-100"
                : "text-gray-500 hover:bg-white/50"
              }`}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-sm font-bold">E-Wallet</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("apple")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full min-w-[140px] transition-all ${paymentMethod === "apple"
                ? "bg-white shadow-sm text-sky-primary border border-gray-100"
                : "text-gray-500 hover:bg-white/50"
              }`}
          >
            <Smartphone className="w-5 h-5" />
            <span className="text-sm font-bold">QRIS</span>
          </button>
        </div>
      </div>

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
                className="w-full bg-gray-100 text-text-dark placeholder:text-gray-400 font-medium rounded-full py-4 pl-12 pr-4 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-sky-primary focus:bg-white transition-all duration-300"
                placeholder="0000 0000 0000 0000"
                type="text"
              />
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
                className="w-full bg-gray-100 text-text-dark placeholder:text-gray-400 font-medium rounded-full py-4 pl-12 pr-4 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-sky-primary focus:bg-white transition-all duration-300"
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
                  className="w-full bg-gray-100 text-text-dark placeholder:text-gray-400 font-medium rounded-full py-4 pl-12 pr-4 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-sky-primary focus:bg-white transition-all duration-300"
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
                  className="w-full bg-gray-100 text-text-dark placeholder:text-gray-400 font-medium rounded-full py-4 pl-12 pr-4 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-sky-primary focus:bg-white transition-all duration-300"
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
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 bg-sky-primary/10 rounded-full flex items-center justify-center mb-4">
            {paymentMethod === "wallet" ? (
              <Wallet className="w-10 h-10 text-sky-primary" />
            ) : (
              <Smartphone className="w-10 h-10 text-sky-primary" />
            )}
          </div>
          <h3 className="text-lg font-bold text-text-dark mb-2">
            {paymentMethod === "wallet" ? "E-Wallet Payment" : "QRIS Payment"}
          </h3>
          <p className="text-gray-500 text-sm">
            You will be redirected to complete payment via{" "}
            {paymentMethod === "wallet" ? "your e-wallet" : "QRIS scan"}.
          </p>
        </div>
      )}

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 py-4 mt-4">
        <ShieldCheck className="w-5 h-5 text-green-500" />
        <span className="text-xs text-gray-500 font-medium">
          Payments are SSL encrypted and 100% secure
        </span>
      </div>

      {/* Pay Button */}
      <button
        type="button"
        onClick={payTransaction}
        disabled={isLoading}
        className="group relative w-full h-14 bg-sky-primary hover:bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg shadow-sky-primary/40 hover:shadow-xl hover:shadow-sky-primary/50 transition-all transform hover:-translate-y-1 active:translate-y-0 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Pay {rupiahFormat(totalPrice)} Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </span>
      </button>

      {/* Trust Badges */}
      <div className="flex justify-center gap-6 mt-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="h-8 px-3 py-1 bg-gray-100 rounded-lg flex items-center text-xs font-bold text-gray-500">
          VISA
        </div>
        <div className="h-8 px-3 py-1 bg-gray-100 rounded-lg flex items-center text-xs font-bold text-gray-500">
          Mastercard
        </div>
        <div className="h-8 px-3 py-1 bg-gray-100 rounded-lg flex items-center text-xs font-bold text-gray-500">
          Midtrans
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
