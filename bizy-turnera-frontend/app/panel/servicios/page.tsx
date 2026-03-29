"use client"

import { useState } from "react"
import { Plus, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockServicios } from "@/mock/data"
import type { Servicio } from "@/mock/data"
import { ServicioCard } from "@/components/panel/servicios/servicio-card"
import { ServicioModal } from "@/components/panel/servicios/servicio-modal"

export default function ServiciosPage() {
  const [servicios, setServicios] = useState(mockServicios)
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState<Servicio | null>(null)

  function handleGuardar(data: { nombre: string; duracionMinutos: number; precio: number }) {
    if (editando) {
      setServicios((prev) =>
        prev.map((s) => (s.id === editando.id ? { ...s, ...data } : s))
      )
    } else {
      const nuevo: Servicio = { id: `s${Date.now()}`, ...data }
      setServicios((prev) => [...prev, nuevo])
    }
    setModalOpen(false)
    setEditando(null)
  }

  function handleEditar(s: Servicio) {
    setEditando(s)
    setModalOpen(true)
  }

  function handleEliminar(id: string) {
    setServicios((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Servicios</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {servicios.length} servicios disponibles
          </p>
        </div>
        <Button
          onClick={() => { setEditando(null); setModalOpen(true) }}
          className="gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Nuevo servicio
        </Button>
      </div>

      {/* Grid */}
      {servicios.length === 0 ? (
        <Card className="border border-border">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Scissors className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-base font-medium text-foreground">
              Todavía no creaste servicios
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Agregá los servicios que ofrecés con su duración y precio.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s) => (
            <ServicioCard
              key={s.id}
              servicio={s}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
            />
          ))}
        </div>
      )}

      <ServicioModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditando(null) }}
        onGuardar={handleGuardar}
        servicio={editando}
      />
    </div>
  )
}
