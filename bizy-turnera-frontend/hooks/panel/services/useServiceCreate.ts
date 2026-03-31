import { api } from "@/lib/axios";
import { ServicioFormData } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useServiceCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ServicioFormData) => {
      const res = await api.post("/services", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Servicio creado correctamente");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al crear el servicio";
      toast.error(message);
    },
  });
}
