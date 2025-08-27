"use client";
import type { User } from "lucia";
import useCheckoutData from "./useCheckoutData";
import { useMemo, useState } from "react";
import { SEAT_VALUES, type SeatValuesType } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  user: User | null;
};

const useTransaction = ({ user }: Props) => {
  const { data } = useCheckoutData();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const selectedSeat = useMemo(() => {
    return SEAT_VALUES[(data?.seat as SeatValuesType) ?? "ECONOMY"];
  }, [data?.seat]);

  const transactionMutate = useMutation({
    mutationFn: (data: unknown) =>
      axios.post("/api/transactions/create", data).then((res) => res.data),
  });

  const payTransaction = async () => {
    if (data && user) {
      return null;
    }

    const totalPrice = Number(
      data?.flightDetail?.price ?? 0 + selectedSeat.additionalPrice
    );

    const bodyData = {
      bookingDate: new Date(),
      customerId: user?.id,
      flightId: data?.flightDetail?.id,
      seatId: data?.seatDetail?.id,
      departureCityCode: data?.flightDetail?.departureCityCode,
      destinationCityCode: data?.flightDetail?.destinationCityCode,
    };

    try {
      setIsLoading(true);
      const transaction = await transactionMutate.mutateAsync(bodyData);

      window.snap.pay(transaction.midtrans.token, {
        onSuccess: function (result: unknown) {
          router.push("/success-checkout");
        },
        onPending: function (result: unknown) {
          router.push("/success-checkout");
        },
        onError: function (result: unknown) {
          alert("payment failed!");
        },
        onClose: function (result: unknown) {
          alert("you closed the popup without finishing the payment");
        },
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return {
    payTransaction,
    isLoading,
  };
};

export default useTransaction;
