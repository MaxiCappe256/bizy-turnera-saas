"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TurnoRow } from "@/components/panel/turnos/turno-row";
import { TurnoModal } from "@/components/panel/turnos/turno-modal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAppointments } from "@/hooks/panel/appointments/useAppointments";
import { useUpdateAppointment } from "@/hooks/panel/appointments/useUpdateAppointment";
import { useDeleteAppointment } from "@/hooks/panel/appointments/useDeleteAppointment";
import { Appointment } from "@/schemas";
import { PaginationSimple } from "@/components/pagination/PaginationSimple";

function TurnosPageInner() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const limit = Math.max(1, Number(searchParams.get("limit") ?? "10") || 10);
  const offset = Math.max(0, Number(searchParams.get("offset") ?? "0") || 0);
  const tab = searchParams.get("tab") ?? "pending";

  const { appointments: turnos, isLoading, isError } = useAppointments();
  const updateAppointment = useUpdateAppointment();
  const deleteAppointment = useDeleteAppointment();

  const pending = turnos.filter(
    (t: Appointment) => t.status === "PENDING" || t.status === "pending",
  );
  const completed = turnos.filter(
    (t: Appointment) => t.status === "COMPLETED" || t.status === "completed",
  );
  const cancelled = turnos.filter(
    (t: Appointment) => t.status === "CANCELED" || t.status === "canceled",
  );

  const listForTab = useMemo(() => {
    if (tab === "all") return turnos;
    if (tab === "completed") return completed;
    if (tab === "cancelled") return cancelled;
    return pending;
  }, [tab, turnos, pending, completed, cancelled]);

  const pageTurnos = useMemo(() => {
    return listForTab.slice(offset, offset + limit);
  }, [listForTab, offset, limit]);

  useEffect(() => {
    if (offset === 0) return;
    if (listForTab.length === 0) return;
    if (offset < listForTab.length) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("offset", "0");
    router.replace(`?${params.toString()}`);
  }, [offset, listForTab.length, router, searchParams]);

  function handleCambiarEstado(id: string, status: Appointment["status"]) {
    updateAppointment.mutate({ id, data: { status } });
  }

  function handleEliminar(id: string) {
    deleteAppointment.mutate(id);
  }

  function TurnosList({ turnos }: { turnos: Appointment[] }) {
    if (isLoading) {
      return (
        <Card className="border border-border">
          <CardContent className="py-10 text-sm text-muted-foreground">
            Cargando turnos...
          </CardContent>
        </Card>
      );
    }

    if (isError) {
      return (
        <Card className="border border-border">
          <CardContent className="py-10 text-sm text-destructive">
            No se pudieron cargar los turnos.
          </CardContent>
        </Card>
      );
    }

    if (turnos.length === 0) {
      return (
        <Card className="border border-border">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground">
              No hay turnos registrados
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              No encontramos turnos en esta categoría.
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
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                    Servicio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                    Fecha y hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {turnos.map((turno) => (
                  <TurnoRow
                    key={turno.id}
                    turno={turno}
                    onCambiarEstado={handleCambiarEstado}
                    onEliminar={handleEliminar}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Turnos</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {turnos.length} turnos en total · {pending.length} Pendiente/s
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Reservar turno
        </Button>
      </div>

      <Tabs
        value={tab}
        onValueChange={(value) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("tab", value);
          params.set("offset", "0");
          router.replace(`?${params.toString()}`);
        }}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos ({turnos.length})</TabsTrigger>
          <TabsTrigger value="pending">
            Pendiente/s ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completado/s ({completed.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelador/s ({cancelled.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <TurnosList turnos={tab === "all" ? pageTurnos : turnos.slice(0, 0)} />
        </TabsContent>
        <TabsContent value="pending">
          <TurnosList
            turnos={tab === "pending" ? pageTurnos : pending.slice(0, 0)}
          />
        </TabsContent>
        <TabsContent value="completed">
          <TurnosList
            turnos={tab === "completed" ? pageTurnos : completed.slice(0, 0)}
          />
        </TabsContent>
        <TabsContent value="cancelled">
          <TurnosList
            turnos={tab === "cancelled" ? pageTurnos : cancelled.slice(0, 0)}
          />
        </TabsContent>
      </Tabs>

      <TurnoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        // onGuardar={handleCrear}
      />

      <PaginationSimple
        totalPages={Math.max(1, Math.ceil(listForTab.length / limit))}
        limit={limit}
        offset={offset}
        query={{ tab }}
      />
    </div>
  );
}

export default function TurnosPage() {
  return (
    <Suspense fallback={null}>
      <TurnosPageInner />
    </Suspense>
  );
}
