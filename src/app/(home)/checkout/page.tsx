import NavbarLight from "@/app/_components/NavbarLight";
import { getUser } from "@/lib/auth";
import { CreditCard, Plane, Armchair } from "lucide-react";
import BookingSummary from "./_components/BookingSummary";
import PaymentForm from "./_components/PaymentForm";
import MobilePaymentBar from "./_components/MobilePaymentBar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Complete Your Booking",
  description:
    "Securely complete your flight booking with our easy payment options. Multiple payment methods available including credit card, e-wallet, and QRIS.",
};

const CheckoutPage = async () => {
  const { user } = await getUser();

  return (
    <div className="bg-background-light min-h-screen font-display">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <NavbarLight />
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/available-flights">
                <span className="flex items-center gap-1">
                  <Plane className="w-4 h-4" /> Flights
                </span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                <span className="flex items-center gap-1">
                  <Armchair className="w-4 h-4" /> Seats
                </span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <span className="flex items-center gap-1 text-sky-primary">
                  <CreditCard className="w-4 h-4" /> Payment
                </span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24 lg:mb-0">
          {/* Left Column: Payment Methods & Form */}
          <div className="lg:col-span-8 space-y-8">
            <PaymentForm user={user} />
          </div>

          {/* Right Column: Booking Summary (Sticky) */}
          <div className="lg:col-span-4 hidden lg:block">
            <BookingSummary user={user} />
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Bar */}
      <MobilePaymentBar user={user} />
    </div>
  );
};

export default CheckoutPage;

