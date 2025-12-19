import NavbarLight from "@/app/_components/NavbarLight";
import { getUser } from "@/lib/auth";
import { Plane } from "lucide-react";
import BookingSummary from "./_components/BookingSummary";
import PaymentForm from "./_components/PaymentForm";

const CheckoutPage = async () => {
  const { user } = await getUser();

  return (
    <div className="bg-background-light min-h-screen font-display">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <NavbarLight />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Visuals & Summary */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Header Text */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 rounded-full text-yellow-800 text-xs font-bold uppercase tracking-wider">
                <Plane className="w-4 h-4" />
                Step 3 of 4
              </div>
              <h1 className="text-text-dark text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight">
                Secure Your
                <br />
                Favorite Spot!
              </h1>
              <p className="text-gray-500 text-lg font-medium leading-relaxed">
                You&apos;re just one step away from your flight. Complete
                payment to confirm your booking.
              </p>
            </div>

            {/* 3D Illustration */}
            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-sky-primary/5 flex items-center justify-center relative">
              {/* Decorative background circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-primary/20 rounded-full blur-3xl" />
              <div className="relative z-10 animate-bounce-slow">
                <Plane className="w-32 h-32 text-sky-primary rotate-45" />
              </div>
            </div>

            {/* Booking Summary Card */}
            <BookingSummary user={user} />
          </div>

          {/* Right Column: Payment Form */}
          <div className="lg:col-span-7 w-full">
            <PaymentForm user={user} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
