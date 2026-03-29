"use client";

import { Pencil, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Cliente } from "@/mock/data";
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
} from "@/components/ui/alert-dialog";

interface Props {
  clientes: any[];
  onEditar: (cliente: Cliente) => void;
  onEliminar: (id: string) => void;
}

export function ClientesTable({ clientes, onEliminar, onEditar }: Props) {
  if (clientes?.length === 0) {
    return (
      <Card className="border border-border">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-base font-medium text-foreground">
            No hay clientes registrados
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Todavía no agregaste ningún cliente. Hacé clic en &ldquo;Nuevo
            cliente&rdquo; para comenzar.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                  Estado de deuda
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                  Monto
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {clientes?.map((cliente) => (
                <tr
                  key={cliente.id}
                  className="border-b border-border last:border-0 transition-colors hover:bg-muted/30"
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {cliente.fullName}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {cliente.phone}
                  </td>
                  <td className="px-6 py-4">
                    {cliente.debt >= 0 ? (
                      <Badge
                        variant="outline"
                        className="rounded-full bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 text-xs"
                      >
                        Al día
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="rounded-full bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800 text-xs"
                      >
                        Con deuda
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {cliente.debt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={() => {onEditar(cliente)}}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Editar cliente"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Eliminar cliente"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              ¿Eliminar cliente?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Vas a eliminar a{" "}
                              <strong>{cliente.fullName}</strong>. Esta acción
                              no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onEliminar(cliente.id)}
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
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
