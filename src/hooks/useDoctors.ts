import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

interface Doctor {
  id: string;
  name: string;
  speciality: string;
  bio: string | null;
  image: string;
  phone: string | null;
  isActive: boolean;
}

interface DoctorsResponse {
  doctors: Doctor[];
}

export function useDoctors() {
  return useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: async () => {
      const { data } = await api.get<DoctorsResponse>("/doctors");
      return data.doctors;
    },
  });
}

export function useDoctor(id: string) {
  return useQuery<Doctor | null>({
    queryKey: ["doctors", id],
    queryFn: async () => {
      const { data } = await api.get<Doctor>(`/doctors/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
