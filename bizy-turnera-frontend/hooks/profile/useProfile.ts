import { api } from "@/lib/axios";
import { User } from "@/schemas";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  return useQuery<User>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data;
    },
    // SI ESTOY EN NAVEGADOR Y EXISTE TOKEN
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
  });
}
