import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useServiceRemove() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/services/${id}`);
    },
    onSuccess: () => {
      toast.success("Servicio eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "No se pudo eliminar el servicio";
      toast.error(message);
    },
  });
}
