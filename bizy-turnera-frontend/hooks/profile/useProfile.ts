import { api } from "@/lib/axios";
import { User } from "@/schemas";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  return useQuery<User>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/auth/profile");
      return res.data;
    },
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token")
  });
}
