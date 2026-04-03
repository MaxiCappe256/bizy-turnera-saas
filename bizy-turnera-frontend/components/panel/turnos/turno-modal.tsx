'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Controller } from 'react-hook-form';
import { Appointment, Client, Service } from '@/schemas';
import { useClients } from '@/hooks/panel/clients/useClients';
import { useServices } from '@/hooks/panel/services/useServices';
import { useCreateAppointment } from '@/hooks/panel/appointments/useCreateAppointment';
import { useProfile } from '@/hooks/profile/useProfile';
import { toast } from 'sonner';

type TurnoFormRaw = {
  clienteId: string;
  servicioId: string;
  fecha: string;
  hora: string;
};

const turnoFormSchema = z.object({
  clienteId: z.string().min(1, 'Seleccioná un cliente'),
  servicioId: z.string().min(1, 'Seleccioná un servicio'),
  fecha: z.string().min(1, 'Seleccioná una fecha'),
  hora: z.string().min(1, 'Seleccioná una hora'),
});

interface Props {
  open: boolean;
  onClose: () => void;
}

export function TurnoModal({ open, onClose }: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TurnoFormRaw>({
    resolver: zodResolver(turnoFormSchema),
  });

  const onSubmit = async (data: TurnoFormRaw) => {
    const userId = profile?.id;
    if (!userId) {
      toast.error('No se pudo obtener el usuario actual');
      return;
    }

    const startAt = new Date(`${data.fecha}T${data.hora}:00`).toISOString();
    await createAppointment.mutateAsync({
      clientId: data.clienteId,
      serviceId: data.servicioId,
      userId,
      startAt,
    });

    reset();
    onClose();
  };

  const { data: profile } = useProfile();
  const createAppointment = useCreateAppointment();
  const { data: clientes = [] } = useClients();
  const { data: servicios = [] } = useServices();

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          onClose();
          reset();
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reservar turno</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 py-2"
          noValidate
        >
          {/* Cliente */}
          <div className="flex flex-col gap-1.5">
            <Label>Cliente</Label>
            <Controller
              name="clienteId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={errors.clienteId ? 'border-destructive' : ''}
                  >
                    <SelectValue placeholder="Seleccioná un cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientes.map((c: Client) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.clienteId && (
              <p className="text-xs text-destructive">
                {errors.clienteId.message}
              </p>
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
                  <SelectTrigger
                    className={errors.servicioId ? 'border-destructive' : ''}
                  >
                    <SelectValue placeholder="Seleccioná un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {servicios.map((s: Service) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name} — {s.duration} min · $
                        {s.price.toLocaleString('es-AR')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.servicioId && (
              <p className="text-xs text-destructive">
                {errors.servicioId.message}
              </p>
            )}
          </div>

          {/* Fecha y hora */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                id="fecha"
                type="date"
                className={errors.fecha ? 'border-destructive' : ''}
                {...register('fecha')}
              />
              {errors.fecha && (
                <p className="text-xs text-destructive">
                  {errors.fecha.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="hora">Hora</Label>
              <Input
                id="hora"
                type="time"
                className={errors.hora ? 'border-destructive' : ''}
                {...register('hora')}
              />
              {errors.hora && (
                <p className="text-xs text-destructive">
                  {errors.hora.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={createAppointment.isPending}>
              {createAppointment.isPending ? 'Reservando...' : 'Reservar turno'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
