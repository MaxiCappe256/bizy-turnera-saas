"use client"

import { useForm, Controller } from "react-hook-form"
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
import { pagoSchema, type PagoFormData } from "@/schemas"
import { mockClientes } from "@/mock/data"
import type { Pago } from "@/mock/data"

interface Props {
  open: boolean
  onClose: () => void
  onGuardar: (data: Omit<Pago, "id">) => void
}

export function PagoModal({ open, onClose, onGuardar }: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PagoFormData>({
    resolver: zodResolver(pagoSchema),
  })

  const onSubmit = async (data: PagoFormData) => {
    await new Promise((r) => setTimeout(r, 400))
    const cliente = mockClientes.find((c) => c.id === data.clienteId)
    onGuardar({
      clienteId: data.clienteId,
      clienteNombre: cliente?.nombre ?? "",
      monto: data.monto,
      metodo: data.metodo,
      concepto: data.concepto,
      fecha: new Date().toISOString().split("T")[0],
    })
    reset()
    toast.success("Pago registrado correctamente")
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { onClose(); reset() } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar pago</DialogTitle>
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
                      <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.clienteId && <p className="text-xs text-destructive">{errors.clienteId.message}</p>}
          </div>

          {/* Concepto */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="concepto">Concepto</Label>
            <Input
              id="concepto"
              placeholder="Corte de cabello"
              className={errors.concepto ? "border-destructive" : ""}
              {...register("concepto")}
            />
            {errors.concepto && <p className="text-xs text-destructive">{errors.concepto.message}</p>}
          </div>

          {/* Monto y método */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="monto">Monto ($)</Label>
              <Input
                id="monto"
                type="number"
                placeholder="2500"
                className={errors.monto ? "border-destructive" : ""}
                {...register("monto", { valueAsNumber: true })}
              />
              {errors.monto && <p className="text-xs text-destructive">{errors.monto.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Método de pago</Label>
              <Controller
                name="metodo"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={errors.metodo ? "border-destructive" : ""}>
                      <SelectValue placeholder="Seleccioná" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="efectivo">Efectivo</SelectItem>
                      <SelectItem value="transferencia">Transferencia</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.metodo && <p className="text-xs text-destructive">{errors.metodo.message}</p>}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => { onClose(); reset() }}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrar pago"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
