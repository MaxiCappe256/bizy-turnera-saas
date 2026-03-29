import { api } from "@/lib/axios";
import { LoginFormData, LoginResponseData } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (data: LoginResponseData) => {
      toast.success("Bienvenido!...");
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      router.push("/panel");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al iniciar sesion...";
      toast.error(message);
    },
  });
}
