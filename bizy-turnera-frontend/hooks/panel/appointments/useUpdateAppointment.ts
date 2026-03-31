import { api } from "@/lib/axios";
import type { Appointment, TurnoCreateData, EstadoTurno } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type UpdateAppointmentInput = {
  id: string;
  data: Partial<TurnoCreateData> & { status?: EstadoTurno };
};

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateAppointmentInput): Promise<Appointment> => {
      const res = await api.patch<Appointment>(`/appointments/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Turno actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al actualizar el turno";
      toast.error(message);
    },
  });
}

