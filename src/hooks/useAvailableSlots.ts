import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

interface TimeSlot {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface SlotsResponse {
  slots: TimeSlot[];
}

interface UseAvailableSlotsParams {
  doctorId: string;
  date: string;
}

export function useAvailableSlots({ doctorId, date }: UseAvailableSlotsParams) {
  return useQuery<TimeSlot[]>({
    queryKey: ["slots", doctorId, date],
    queryFn: async () => {
      const { data } = await api.get<SlotsResponse>("/slots", {
        params: { doctorId, date },
      });
      return data.slots;
    },
    enabled: !!doctorId && !!date,
  });
}

// Get available dates for a doctor (dates that have at least one available slot)
export function useAvailableDates(doctorId: string, startDate: string, endDate: string) {
  return useQuery<string[]>({
    queryKey: ["available-dates", doctorId, startDate, endDate],
    queryFn: async () => {
      const { data } = await api.get<{ dates: string[] }>("/slots/available-dates", {
        params: { doctorId, startDate, endDate },
      });
      return data.dates;
    },
    enabled: !!doctorId && !!startDate && !!endDate,
  });
}
