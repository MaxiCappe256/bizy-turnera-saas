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
import { clienteSchema, type ClienteFormData } from "@/schemas";
import type { Cliente } from "@/mock/data";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: ClienteFormData) => void;
  cliente: Cliente | null;
}

export function ClienteModal({ open, onClose, cliente, onSave }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
  });

  useEffect(() => {
    if (open) {
      reset(
        cliente
          ? { fullName: cliente.fullName, phone: cliente.phone }
          : { fullName: "", phone: "" },
      );
    }
  }, [open, cliente, reset]);

  const onSubmit = async (data: ClienteFormData) => {
    onSave(data);

    toast.success(
      cliente
        ? "Cliente actualizado correctamente"
        : "Cliente creado correctamente",
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {cliente ? "Editar cliente" : "Nuevo cliente"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 py-2"
          noValidate
        >
          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input
              id="fullName"
              placeholder="Juan García"
              className={errors.fullName ? "border-destructive" : ""}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="phone"
              placeholder="+54 11 1234-5678"
              className={errors.phone ? "border-destructive" : ""}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">
                {errors.phone.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Guardando..."
                : cliente
                  ? "Guardar cambios"
                  : "Crear cliente"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
