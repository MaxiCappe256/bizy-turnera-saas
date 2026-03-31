"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Service, servicioSchema, type ServicioFormData } from "@/schemas";

interface Props {
  open: boolean;
  onClose: () => void;
  onGuardar: (data: ServicioFormData) => void;
  servicio: Service | null;
}

export function ServicioModal({ open, onClose, onGuardar, servicio }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServicioFormData>({
    resolver: zodResolver(servicioSchema),
  });

  useEffect(() => {
    if (servicio) {
      reset({
        name: servicio.name,
        duration: servicio.duration,
        price: servicio.price,
      });
    } else {
      reset({
        name: "",
        duration: 30,
        price: 0,
      });
    }
  }, [servicio, reset]);

  const onSubmit = async (data: ServicioFormData) => {
    await new Promise((r) => setTimeout(r, 400));
    onGuardar(data);
    toast.success(
      servicio
        ? "Servicio actualizado correctamente"
        : "Servicio creado correctamente",
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {servicio ? "Editar servicio" : "Nuevo servicio"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 py-2"
          noValidate
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nombre">Nombre del servicio</Label>
            <Input
              id="name"
              placeholder="Corte de cabello"
              className={errors.name ? "border-destructive" : ""}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="duracion">Duración (minutos)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="30"
                className={errors.duration ? "border-destructive" : ""}
                {...register("duration", { valueAsNumber: true })}
              />
              {errors.duration && (
                <p className="text-xs text-destructive">
                  {errors.duration.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="price">Precio ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="2500"
                className={errors.price ? "border-destructive" : ""}
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-xs text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Guardando..."
                : servicio
                  ? "Guardar cambios"
                  : "Crear servicio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
