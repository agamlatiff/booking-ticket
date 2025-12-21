import NavbarLight from "@/app/_components/NavbarLight";
import { getUser } from "@/lib/auth";
import { CheckCircle, CreditCard } from "lucide-react";
import Link from "next/link";
import BookingSummary from "./_components/BookingSummary";
import PaymentForm from "./_components/PaymentForm";
import MobilePaymentBar from "./_components/MobilePaymentBar";

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
        <nav className="mb-8">
          <ol className="flex items-center gap-3 text-sm font-medium">
            <li>
              <Link
                href="/available-flights"
                className="text-gray-400 hover:text-sky-primary transition-colors flex items-center gap-1"
              >
                <CheckCircle className="w-4 h-4" /> Flight
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <span
                className="text-gray-400 flex items-center gap-1 cursor-default"
              >
                <CheckCircle className="w-4 h-4" /> Seats
              </span>
            </li>
            <li className="text-gray-300">/</li>
            <li className="text-sky-primary flex items-center gap-1">
              <CreditCard className="w-4 h-4" /> Payment
            </li>
          </ol>
        </nav>

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
