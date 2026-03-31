"use client";

import { useState } from "react";
import { Plus, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ServicioCard } from "@/components/panel/servicios/servicio-card";
import { ServicioModal } from "@/components/panel/servicios/servicio-modal";

import { useServices } from "@/hooks/panel/services/useServices";
import { useServiceCreate } from "@/hooks/panel/services/useServiceCreate";
import { useServiceUpdate } from "@/hooks/panel/services/useServiceUpdate";

import { useDebounce } from "@/hooks/useDebounce";
import { Service, ServicioFormData } from "@/schemas";
import { useServiceRemove } from "@/hooks/panel/services/useServiceRemove";

export default function ServiciosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<any | null>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const { data: servicios = [], isLoading } = useServices(debouncedSearch);

  const { mutate: crearServicio } = useServiceCreate();
  const { mutate: actualizarServicio } = useServiceUpdate();
  const { mutate: eliminarServicio } = useServiceRemove();

  function handleGuardar(data: ServicioFormData) {
    if (editando) {
      actualizarServicio({
        id: editando.id,
        data,
      });
    } else {
      crearServicio(data);
    }
    setModalOpen(false);
    setEditando(null);
  }

  function handleEditar(servicio: Service) {
    setEditando(servicio);
    setModalOpen(true);
  }

  function handleEliminar(id: string) {
    eliminarServicio(id);
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
          onClick={() => {
            setEditando(null);
            setModalOpen(true);
          }}
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
          {servicios.map((s: any) => (
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
        onClose={() => {
          setModalOpen(false);
          setEditando(null);
        }}
        onGuardar={handleGuardar}
        servicio={editando}
      />
    </div>
  );
}
