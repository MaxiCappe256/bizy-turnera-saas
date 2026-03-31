import { api } from "@/lib/axios";
import type { Appointment } from "@/schemas";
import { useQuery } from "@tanstack/react-query";

export function useAppointments(limit: number = 10, offset: number = 0) {
  const query = useQuery({
    queryKey: ["appointments", limit, offset],
    queryFn: async (): Promise<Appointment[]> => {
      const res = await api.get<Appointment[]>("/appointments", {
        params: {
          limit,
          offset,
        },
      });
      return res.data;
    },
  });

  return {
    appointments: query.data ?? [],
    ...query,
  };
}
