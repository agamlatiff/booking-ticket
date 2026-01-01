import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
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
  image: string;
}

interface TimeSlot {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface PatientInfo {
  name: string;
  phone: string;
  notes?: string;
}

interface BookingState {
  // Selected data
  selectedService: Service | null;
  selectedDoctor: Doctor | null;
  selectedSlot: TimeSlot | null;
  patientInfo: PatientInfo | null;

  // Current step (1: service, 2: doctor, 3: slot, 4: checkout)
  currentStep: number;

  // Actions
  setService: (service: Service) => void;
  setDoctor: (doctor: Doctor) => void;
  setSlot: (slot: TimeSlot) => void;
  setPatientInfo: (info: PatientInfo) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const initialState = {
  selectedService: null,
  selectedDoctor: null,
  selectedSlot: null,
  patientInfo: null,
  currentStep: 1,
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...initialState,

      setService: (service) =>
        set({
          selectedService: service,
          // Reset downstream selections when service changes
          selectedDoctor: null,
          selectedSlot: null,
        }),

      setDoctor: (doctor) =>
        set({
          selectedDoctor: doctor,
          // Reset slot when doctor changes
          selectedSlot: null,
        }),

      setSlot: (slot) => set({ selectedSlot: slot }),

      setPatientInfo: (info) => set({ patientInfo: info }),

      setStep: (step) => set({ currentStep: step }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 4),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      reset: () => set(initialState),
    }),
    {
      name: "booking-storage",
      partialize: (state) => ({
        selectedService: state.selectedService,
        selectedDoctor: state.selectedDoctor,
        selectedSlot: state.selectedSlot,
        patientInfo: state.patientInfo,
        currentStep: state.currentStep,
      }),
    }
  )
);

// Selector hooks for common patterns
export const useSelectedService = () =>
  useBookingStore((state) => state.selectedService);

export const useSelectedDoctor = () =>
  useBookingStore((state) => state.selectedDoctor);

export const useSelectedSlot = () =>
  useBookingStore((state) => state.selectedSlot);

export const useBookingStep = () =>
  useBookingStore((state) => state.currentStep);

export const useCanProceedToCheckout = () =>
  useBookingStore(
    (state) =>
      state.selectedService !== null &&
      state.selectedDoctor !== null &&
      state.selectedSlot !== null
  );
