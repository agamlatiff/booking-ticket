import { create } from "zustand";
import { persist } from "zustand/middleware";

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
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface BookingState {
  // Selected items
  service: Service | null;
  doctor: Doctor | null;
  date: Date | null;
  timeSlot: TimeSlot | null;

  // Patient info
  patientName: string;
  patientPhone: string;
  notes: string;

  // Booking result
  bookingId: string | null;
  bookingCode: string | null;
  expiresAt: Date | null;

  // Actions
  setService: (service: Service) => void;
  setDoctor: (doctor: Doctor) => void;
  setDate: (date: Date) => void;
  setTimeSlot: (slot: TimeSlot) => void;
  setPatientInfo: (name: string, phone: string, notes: string) => void;
  setBookingResult: (id: string, code: string, expiresAt: Date) => void;
  reset: () => void;

  // Computed
  currentStep: () => number;
}

const initialState = {
  service: null,
  doctor: null,
  date: null,
  timeSlot: null,
  patientName: "",
  patientPhone: "",
  notes: "",
  bookingId: null,
  bookingCode: null,
  expiresAt: null,
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setService: (service) => set({ service }),

      setDoctor: (doctor) => set({ doctor }),

      setDate: (date) => set({ date }),

      setTimeSlot: (slot) => set({ timeSlot: slot }),

      setPatientInfo: (patientName, patientPhone, notes) =>
        set({ patientName, patientPhone, notes }),

      setBookingResult: (bookingId, bookingCode, expiresAt) =>
        set({ bookingId, bookingCode, expiresAt }),

      reset: () => set(initialState),

      currentStep: () => {
        const state = get();
        if (!state.service) return 1;
        if (!state.doctor || !state.date || !state.timeSlot) return 2;
        return 3;
      },
    }),
    {
      name: "dental-booking",
      partialize: (state) => ({
        service: state.service,
        doctor: state.doctor,
        date: state.date,
        timeSlot: state.timeSlot,
        patientName: state.patientName,
        patientPhone: state.patientPhone,
        notes: state.notes,
      }),
    }
  )
);
