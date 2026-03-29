import { api } from "@/lib/axios";
import { RegistroFormData } from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useRegistro() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: RegistroFormData) => {
      const res = await api.post("/auth/register", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Cuenta creada correctamente");
      router.push("/login");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Error al crear cuenta";
      toast.error(message);
    },
  });
}
