"use client"

import { useState } from "react"
import { Plus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockTurnos } from "@/mock/data"
import type { Turno } from "@/mock/data"
import { TurnoRow } from "@/components/panel/turnos/turno-row"
import { TurnoModal } from "@/components/panel/turnos/turno-modal"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function TurnosPage() {
  const [turnos, setTurnos] = useState(mockTurnos)
  const [modalOpen, setModalOpen] = useState(false)

  function handleCrear(data: { clienteId: string; clienteNombre: string; servicioId: string; servicioNombre: string; fecha: string; hora: string }) {
    const nuevo: Turno = {
      id: `t${Date.now()}`,
      estado: "pendiente",
      ...data,
    }
    setTurnos((prev) => [nuevo, ...prev])
    setModalOpen(false)
  }

  function handleCambiarEstado(id: string, estado: Turno["estado"]) {
    setTurnos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, estado } : t))
    )
  }

  function handleEliminar(id: string) {
    setTurnos((prev) => prev.filter((t) => t.id !== id))
  }

  const pendientes = turnos.filter((t) => t.estado === "pendiente")
  const completados = turnos.filter((t) => t.estado === "completado")
  const cancelados = turnos.filter((t) => t.estado === "cancelado")

  function TurnosList({ items }: { items: Turno[] }) {
    if (items.length === 0) {
      return (
        <Card className="border border-border">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground">No hay turnos registrados</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              No encontramos turnos en esta categoría.
            </p>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card className="border border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Servicio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Fecha y hora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Estado</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((turno) => (
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
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Turnos</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {turnos.length} turnos en total · {pendientes.length} pendientes
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Reservar turno
        </Button>
      </div>

      <Tabs defaultValue="todos">
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todos ({turnos.length})</TabsTrigger>
          <TabsTrigger value="pendientes">Pendientes ({pendientes.length})</TabsTrigger>
          <TabsTrigger value="completados">Completados ({completados.length})</TabsTrigger>
          <TabsTrigger value="cancelados">Cancelados ({cancelados.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="todos"><TurnosList items={turnos} /></TabsContent>
        <TabsContent value="pendientes"><TurnosList items={pendientes} /></TabsContent>
        <TabsContent value="completados"><TurnosList items={completados} /></TabsContent>
        <TabsContent value="cancelados"><TurnosList items={cancelados} /></TabsContent>
      </Tabs>

      <TurnoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onGuardar={handleCrear}
      />
    </div>
  )
}
