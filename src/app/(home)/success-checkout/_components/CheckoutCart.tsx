import type { User } from "lucia";
import type { FC } from "react";
import FlightCard from "../../checkout/_components/FlightCard";

interface CheckoutCardProps {
  user: User | null
}

const CheckoutCart : FC<CheckoutCardProps> = ({user}) => {
  return <FlightCard user={user} />;
};

export default CheckoutCart;
