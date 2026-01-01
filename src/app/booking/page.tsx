import { Suspense } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import BookingWizard from "./_components/BookingWizard";
import prisma from "@/lib/prisma";

// Fetch services
async function getServices() {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

// Fetch doctors
async function getDoctors() {
  return prisma.doctor.findMany({
    where: { isActive: true },
    include: {
      scheduleTemplates: {
        where: { isActive: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export default async function BookingPage() {
  const [services, doctors] = await Promise.all([getServices(), getDoctors()]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Booking Jadwal
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Pilih layanan, dokter, dan jadwal yang sesuai untuk Anda
            </p>
          </div>

          {/* Booking Wizard */}
          <Suspense fallback={<BookingLoading />}>
            <BookingWizard services={services} doctors={doctors} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function BookingLoading() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
