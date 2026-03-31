import { api } from "@/lib/axios";
import type { Appointment } from "@/schemas";
import { useQuery } from "@tanstack/react-query";

export function useAppointmentById(id?: string) {
  const query = useQuery({
    queryKey: ["appointments", id],
    enabled: Boolean(id),
    queryFn: async (): Promise<Appointment> => {
      const res = await api.get<Appointment>(`/appointments/${id}`);
      return res.data;
    },
  });

  return {
    appointment: query.data,
    ...query,
  };
}

