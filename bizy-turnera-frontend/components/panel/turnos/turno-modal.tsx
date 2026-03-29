"use client"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { turnoSchema } from "@/schemas"
import {  mockServicios } from "@/mock/data"
import { Controller } from "react-hook-form"

type TurnoFormRaw = {
  clienteId: string
  servicioId: string
  fecha: string
  hora: string
}

interface Props {
  open: boolean
  onClose: () => void
  onGuardar: (data: {
    clienteId: string
    clienteNombre: string
    servicioId: string
    servicioNombre: string
    fecha: string
    hora: string
  }) => void
}

export function TurnoModal({ open, onClose, onGuardar }: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TurnoFormRaw>({
    resolver: zodResolver(turnoSchema),
  })

  const onSubmit = async (data: TurnoFormRaw) => {
    await new Promise((r) => setTimeout(r, 400))
    const cliente = mockClientes.find((c) => c.id === data.clienteId)
    const servicio = mockServicios.find((s) => s.id === data.servicioId)
    onGuardar({
      ...data,
      clienteNombre: cliente?.nombre ?? "",
      servicioNombre: servicio?.nombre ?? "",
    })
    reset()
    toast.success("Turno reservado correctamente")
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { onClose(); reset() } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reservar turno</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 py-2" noValidate>
          {/* Cliente */}
          <div className="flex flex-col gap-1.5">
            <Label>Cliente</Label>
            <Controller
              name="clienteId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={errors.clienteId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Seleccioná un cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClientes.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.clienteId && (
              <p className="text-xs text-destructive">{errors.clienteId.message}</p>
            )}
          </div>

          {/* Servicio */}
          <div className="flex flex-col gap-1.5">
            <Label>Servicio</Label>
            <Controller
              name="servicioId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={errors.servicioId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Seleccioná un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockServicios.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.nombre} — {s.duracionMinutos} min · ${s.precio.toLocaleString("es-AR")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.servicioId && (
              <p className="text-xs text-destructive">{errors.servicioId.message}</p>
            )}
          </div>

          {/* Fecha y hora */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                id="fecha"
                type="date"
                className={errors.fecha ? "border-destructive" : ""}
                {...register("fecha")}
              />
              {errors.fecha && <p className="text-xs text-destructive">{errors.fecha.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="hora">Hora</Label>
              <Input
                id="hora"
                type="time"
                className={errors.hora ? "border-destructive" : ""}
                {...register("hora")}
              />
              {errors.hora && <p className="text-xs text-destructive">{errors.hora.message}</p>}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => { onClose(); reset() }}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Reservando..." : "Reservar turno"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
