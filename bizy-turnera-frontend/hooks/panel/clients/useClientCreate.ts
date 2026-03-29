import { api } from "@/lib/axios";
import { ClienteFormData } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useClientCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ClienteFormData) => {
      const res = await api.post("/clients", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Cliente creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al crear el cliente";
        toast.error(message)
    },
  });
}
