import React, { type FC, type ReactNode } from "react";
import QCProvider from "./providers/QueryProvider";
import FlightProvider from "./providers/FlightProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flight Search Results",
  description:
    "Find and compare flights to your destination. Filter by price, duration, and airlines. Book your perfect flight with FlyHigher.",
};

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <QCProvider>
      <FlightProvider>{children}</FlightProvider>
    </QCProvider>
  );
};

export default Layout;

