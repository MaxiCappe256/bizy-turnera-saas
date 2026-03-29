"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { servicioSchema, type ServicioFormData } from "@/schemas"
import type { Servicio } from "@/mock/data"

interface Props {
  open: boolean
  onClose: () => void
  onGuardar: (data: ServicioFormData) => void
  servicio: Servicio | null
}

export function ServicioModal({ open, onClose, onGuardar, servicio }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServicioFormData>({
    resolver: zodResolver(servicioSchema),
  })

  useEffect(() => {
    if (open) {
      reset(
        servicio
          ? { nombre: servicio.nombre, duracionMinutos: servicio.duracionMinutos, precio: servicio.precio }
          : { nombre: "", duracionMinutos: 30, precio: 0 }
      )
    }
  }, [open, servicio, reset])

  const onSubmit = async (data: ServicioFormData) => {
    await new Promise((r) => setTimeout(r, 400))
    onGuardar(data)
    toast.success(servicio ? "Servicio actualizado correctamente" : "Servicio creado correctamente")
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{servicio ? "Editar servicio" : "Nuevo servicio"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 py-2" noValidate>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nombre">Nombre del servicio</Label>
            <Input
              id="nombre"
              placeholder="Corte de cabello"
              className={errors.nombre ? "border-destructive" : ""}
              {...register("nombre")}
            />
            {errors.nombre && <p className="text-xs text-destructive">{errors.nombre.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="duracion">Duración (minutos)</Label>
              <Input
                id="duracion"
                type="number"
                placeholder="30"
                className={errors.duracionMinutos ? "border-destructive" : ""}
                {...register("duracionMinutos", { valueAsNumber: true })}
              />
              {errors.duracionMinutos && (
                <p className="text-xs text-destructive">{errors.duracionMinutos.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="precio">Precio ($)</Label>
              <Input
                id="precio"
                type="number"
                placeholder="2500"
                className={errors.precio ? "border-destructive" : ""}
                {...register("precio", { valueAsNumber: true })}
              />
              {errors.precio && <p className="text-xs text-destructive">{errors.precio.message}</p>}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : servicio ? "Guardar cambios" : "Crear servicio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
