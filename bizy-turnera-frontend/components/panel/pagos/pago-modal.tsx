'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  pagoSchema,
  type PagoFormData,
  type Appointment,
  type Client,
} from '@/schemas';

import { format } from 'date-fns';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onSubmit: (data: PagoFormData) => void;
  clientes: Client[];
}

export function PagoModal({
  open,
  onClose,
  appointments,
  onSubmit,
  clientes,
}: Props) {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PagoFormData>({
    resolver: zodResolver(pagoSchema),
  });

  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = clientes.filter((c) =>
    c.fullName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          onClose();
          reset();
          setSelectedClient(null);
          setSearch('');
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar pago</DialogTitle>
        </DialogHeader>

        {/* Buscar cliente */}
        {/* <div className="flex flex-col gap-2">
          <Label>Cliente</Label>

          <input
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 bg-slate-800 rounded-md"
          />

          {!selectedClient && (
            <div className="max-h-40 overflow-y-auto border rounded-md">
              {filteredClients.slice(0, 10).map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedClient(c);
                    setValue('clientId', c.id); // guarda en el form
                  }}
                  className="cursor-pointer px-3 py-2 hover:bg-slate-700"
                >
                  {c.fullName}
                </div>
              ))}
            </div>
          )}

          {selectedClient && (
            <div className="text-sm bg-slate-800 px-3 py-2 rounded-md flex justify-between">
              {selectedClient.fullName}

              <button
                type="button"
                onClick={() => {
                  setSelectedClient(null);
                  setValue('clientId', '');
                }}
                className="text-red-400"
              >
                Cambiar
              </button>
            </div>
          )}
        </div> */}

        <form
          onSubmit={handleSubmit(async (data) => {
            await Promise.resolve(onSubmit(data));
            reset();
            setSelectedClient(null);
            setSearch('');
          })}
          className="flex flex-col gap-5 py-2"
          noValidate
        >
          {/* Turno */}
          <div className="flex flex-col gap-1.5">
            <Label>Turno</Label>

            <Controller
              name="appointmentId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={errors.appointmentId ? 'border-destructive' : ''}
                  >
                    <SelectValue placeholder="Seleccioná un turno" />
                  </SelectTrigger>

                  <SelectContent>
                    {appointments.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.client.fullName} · {a.service.name} ·{' '}
                        {format(new Date(a.startAt), 'dd/MM HH:mm')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.appointmentId && (
              <p className="text-xs text-destructive">
                {errors.appointmentId.message}
              </p>
            )}
          </div>

          {/* Método */}
          <div className="flex flex-col gap-1.5">
            <Label>Método de pago</Label>

            <Controller
              name="method"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={errors.method ? 'border-destructive' : ''}
                  >
                    <SelectValue placeholder="Seleccioná" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="cash">Efectivo</SelectItem>
                    <SelectItem value="transfer">Transferencia</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.method && (
              <p className="text-xs text-destructive">
                {errors.method.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onClose();
                reset();
                setSelectedClient(null);
                setSearch('');
              }}
            >
              Cancelar
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registrando...' : 'Registrar pago'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
