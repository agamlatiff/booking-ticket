import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  dpAmount: number;
  duration: number;
  image: string | null;
  isActive: boolean;
  order: number;
}

interface ServicesResponse {
  services: Service[];
}

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      const { data } = await api.get<ServicesResponse>("/services");
      return data.services;
    },
  });
}

export function useService(slug: string) {
  return useQuery<Service | null>({
    queryKey: ["services", slug],
    queryFn: async () => {
      const { data } = await api.get<Service>(`/services/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
}
