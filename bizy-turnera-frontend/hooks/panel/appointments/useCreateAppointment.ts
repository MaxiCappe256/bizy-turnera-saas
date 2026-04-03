import { api } from "@/lib/axios";
import type { Appointment, TurnoCreateData } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TurnoCreateData): Promise<Appointment> => {
      const res = await api.post<Appointment>("/appointments", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Turno creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["appointments"], exact: false });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Error al crear el turno";
      toast.error(message);
    },
  });
}

