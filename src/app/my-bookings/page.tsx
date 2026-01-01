import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import prisma from "@/lib/prisma";
import Link from "next/link";
import BookingList from "./_components/BookingList";

export const dynamic = "force-dynamic";

async function getBookings(userId: string) {
  return prisma.booking.findMany({
    where: { patientId: userId },
    include: {
      service: { select: { name: true, slug: true, duration: true } },
      doctor: { select: { name: true, speciality: true, image: true } },
    },
    orderBy: { appointmentDate: "desc" },
  });
}

export default async function MyBookingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in?callbackUrl=/my-bookings");
  }

  const bookings = await getBookings(session.user.id);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Booking Saya
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Riwayat dan jadwal perawatan gigi Anda
              </p>
            </div>
            <Link
              href="/booking"
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
            >
              + Booking Baru
            </Link>
          </div>

          {/* Booking List with Filters */}
          <BookingList bookings={bookings as any} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
