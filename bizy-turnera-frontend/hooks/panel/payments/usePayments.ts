import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function usePayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await api.get("/payments", {
        params: {
          limit: 10,
          offset: 0,
        },
      });
      return res.data;
    },
  });
}
