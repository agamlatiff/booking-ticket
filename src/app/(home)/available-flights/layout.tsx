import React, { type FC, type ReactNode } from "react";
import QCProvider from "./providers/QueryProvider";
import FlightProvider from "./providers/FlightProvider";

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
