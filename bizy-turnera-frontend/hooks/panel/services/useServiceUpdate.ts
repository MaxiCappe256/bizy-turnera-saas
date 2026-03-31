import { api } from "@/lib/axios";
import { ClienteFormData, ServicioFormData } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useServiceUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ServicioFormData }) => {
      const res = await api.patch(`/services/${id}`, data);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Servicio actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },

    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al actualizar servicio";
      toast.error(message);
    },
  });
}
