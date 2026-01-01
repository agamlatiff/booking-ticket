"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StepIndicator from "./StepIndicator";
import StepService from "./StepService";
import StepSchedule from "./StepSchedule";
import StepCheckout from "./StepCheckout";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  dpAmount: number;
  duration: number;
  image: string | null;
}

interface Doctor {
  id: string;
  name: string;
  speciality: string;
  bio: string | null;
  image: string | null;
  phone: string | null;
  scheduleTemplates: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
}

interface BookingData {
  service: Service | null;
  doctor: Doctor | null;
  date: Date | null;
  timeSlot: { id: string; startTime: string; endTime: string } | null;
  patientName: string;
  patientPhone: string;
  notes: string;
}

interface BookingWizardProps {
  services: Service[];
  doctors: Doctor[];
}

export default function BookingWizard({ services, doctors }: BookingWizardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    doctor: null,
    date: null,
    timeSlot: null,
    patientName: "",
    patientPhone: "",
    notes: "",
  });

  // Check for pre-selected service from URL
  useEffect(() => {
    const serviceSlug = searchParams.get("service");
    if (serviceSlug) {
      const preSelectedService = services.find((s) => s.slug === serviceSlug);
      if (preSelectedService) {
        setBookingData((prev) => ({ ...prev, service: preSelectedService }));
        setCurrentStep(2);
      }
    }
  }, [searchParams, services]);

  const handleSelectService = (service: Service) => {
    setBookingData((prev) => ({ ...prev, service }));
    setCurrentStep(2);
  };

  const handleSelectSchedule = (
    doctor: Doctor,
    date: Date,
    timeSlot: { id: string; startTime: string; endTime: string }
  ) => {
    setBookingData((prev) => ({ ...prev, doctor, date, timeSlot }));
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    router.push("/my-bookings");
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} />

      {/* Step Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {currentStep === 1 && (
          <StepService
            services={services}
            selectedService={bookingData.service}
            onSelect={handleSelectService}
          />
        )}

        {currentStep === 2 && (
          <StepSchedule
            doctors={doctors}
            selectedDoctor={bookingData.doctor}
            selectedDate={bookingData.date}
            selectedSlot={bookingData.timeSlot}
            onSelect={handleSelectSchedule}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && bookingData.service && bookingData.doctor && bookingData.date && bookingData.timeSlot && (
          <StepCheckout
            bookingData={bookingData}
            setBookingData={setBookingData}
            onBack={handleBack}
            onComplete={handleComplete}
          />
        )}
      </div>
    </div>
  );
}
