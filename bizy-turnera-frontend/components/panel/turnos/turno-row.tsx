'use client';

import { Trash2, CheckCircle, XCircle, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { EstadoBadge } from './estado-badge';
import { Appointment } from '@/schemas';
import { format } from 'date-fns';

interface Props {
  turno: Appointment;
  onCambiarEstado: (id: string, estado: Appointment['status']) => void;
}

export function TurnoRow({ turno, onCambiarEstado }: Props) {
  return (
    <tr className="border-b border-border last:border-0 transition-colors hover:bg-muted/30">
      <td className="px-6 py-4 font-medium text-foreground">
        {turno.client.fullName}
      </td>
      <td className="px-6 py-4 text-muted-foreground">{turno.service.name}</td>
      <td className="px-6 py-4">
        {format(new Date(turno.startAt), 'dd/MM/yyyy')} -{' '}
        {format(new Date(turno.startAt), 'HH:mm')}
      </td>
      <td className="px-6 py-4">
        <EstadoBadge estado={turno.status} />
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Cambiar estado
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onCambiarEstado(turno.id, 'pending')}
                className="gap-2"
              >
                <Clock className="h-3.5 w-3.5 text-yellow-500" />
                Pendiente
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onCambiarEstado(turno.id, 'completed')}
                className="gap-2"
              >
                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                Completado
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onCambiarEstado(turno.id, 'canceled')}
                className="gap-2 text-destructive focus:text-destructive"
              >
                <XCircle className="h-3.5 w-3.5" />
                Cancelado
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}
