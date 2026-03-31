import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useServices(search?: string) {
  return useQuery({
    queryKey: ["services", search],
    queryFn: async () => {
      const res = await api.get("/services", {
        params: {
          term: search || undefined,
        },
      });
      return res.data;
    },
  });
}
