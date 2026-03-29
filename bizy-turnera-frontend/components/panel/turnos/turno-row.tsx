"use client"

import { Trash2, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "@/components/ui/alert-dialog"
import { EstadoBadge } from "./estado-badge"
import type { Turno } from "@/mock/data"

interface Props {
  turno: Turno
  onCambiarEstado: (id: string, estado: Turno["estado"]) => void
  onEliminar: (id: string) => void
}

export function TurnoRow({ turno, onCambiarEstado, onEliminar }: Props) {
  return (
    <tr className="border-b border-border last:border-0 transition-colors hover:bg-muted/30">
      <td className="px-6 py-4 font-medium text-foreground">{turno.clienteNombre}</td>
      <td className="px-6 py-4 text-muted-foreground">{turno.servicioNombre}</td>
      <td className="px-6 py-4 text-muted-foreground">
        {turno.fecha} · {turno.hora}
      </td>
      <td className="px-6 py-4">
        <EstadoBadge estado={turno.estado} />
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
                onClick={() => onCambiarEstado(turno.id, "pendiente")}
                className="gap-2"
              >
                <Clock className="h-3.5 w-3.5 text-yellow-500" />
                Pendiente
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onCambiarEstado(turno.id, "completado")}
                className="gap-2"
              >
                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                Completado
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onCambiarEstado(turno.id, "cancelado")}
                className="gap-2 text-destructive focus:text-destructive"
              >
                <XCircle className="h-3.5 w-3.5" />
                Cancelado
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                aria-label="Eliminar turno"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar turno?</AlertDialogTitle>
                <AlertDialogDescription>
                  Vas a eliminar el turno de <strong>{turno.clienteNombre}</strong> del{" "}
                  {turno.fecha} a las {turno.hora}. Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onEliminar(turno.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </tr>
  )
}
