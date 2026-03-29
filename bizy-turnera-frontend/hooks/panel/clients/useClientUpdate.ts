import { api } from "@/lib/axios";
import { ClienteFormData } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useClientUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ClienteFormData }) => {
      const res = await api.patch(`/clients/${id}`, data);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Cliente actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },

    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al actualizar cliente";
      toast.error(message);
    },
  });
}
