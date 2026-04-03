import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PagoFormData } from "@/schemas";
import { toast } from "sonner";

export function usePaymentCreate() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: PagoFormData) => {
      const res = await api.post('/payments', data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Pago creado correctamente")
      queryClient.invalidateQueries({ queryKey: ['payments'] })
      queryClient.invalidateQueries({ queryKey: ['payments-stats'] })
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Error al crear el pago"
      toast.error(message)
    }
  })
}