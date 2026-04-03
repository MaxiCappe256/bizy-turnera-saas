import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function usePaymentsStats() {
  return useQuery({
    queryKey: ['payments-stats'],
    queryFn: async () => {
      const res = await api.get('/payments/stats')
      return res.data;
    }
  })
}