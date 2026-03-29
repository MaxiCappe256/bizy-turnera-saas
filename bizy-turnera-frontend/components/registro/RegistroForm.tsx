import { RegistroFormData, registroSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import  { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { useRegistro } from "@/hooks/registro/useRegistro";

export default function RegistroForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistroFormData>({
    resolver: zodResolver(registroSchema),
  });

  const onSubmit = async (data: RegistroFormData) => {
    registroMutate(data);
  };

  const { mutate: registroMutate, isPending } = useRegistro();

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        noValidate
      >
        {/* Nombre */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="nombre">Tu nombre completo</Label>
          <Input
            id="fullName"
            placeholder="Juan García"
            className={errors.fullName ? "border-destructive" : ""}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        {/* Negocio */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="businessName">Nombre de tu negocio</Label>
          <Input
            id="businessName"
            placeholder="Barbería El Filo"
            className={errors.businessName ? "border-destructive" : ""}
            {...register("businessName")}
          />
          {errors.businessName && (
            <p className="text-xs text-destructive">{errors.businessName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@correo.com"
            autoComplete="email"
            className={errors.email ? "border-destructive" : ""}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Al menos 6 caracteres"
              autoComplete="new-password"
              className={errors.password ? "border-destructive pr-10" : "pr-10"}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="mt-1 w-full" disabled={isPending}>
          {isPending ? "Creando cuenta..." : "Crear cuenta gratis"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Al registrarte aceptás nuestros{" "}
          <a href="#" className="text-primary hover:underline">
            Términos de uso
          </a>{" "}
          y{" "}
          <a href="#" className="text-primary hover:underline">
            Política de privacidad
          </a>
          .
        </p>
      </form>
    </div>
  );
}
