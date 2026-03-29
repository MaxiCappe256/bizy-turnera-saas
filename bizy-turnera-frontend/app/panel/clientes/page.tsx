"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientesTable } from "@/components/panel/clientes/clientes-table";
import { ClienteModal } from "@/components/panel/clientes/cliente-modal";
import type { Cliente } from "@/mock/data";
import { useClients } from "@/hooks/panel/clients/useClients";
import { useDebounce } from "@/hooks/useDebounce";
import { useClientRemove } from "@/hooks/panel/clients/useClientRemove";
import { useClientCreate } from "@/hooks/panel/clients/useClientCreate";
import { ClienteFormData } from "@/schemas";
import { useClientUpdate } from "@/hooks/panel/clients/useClientUpdate";

export default function ClientesPage() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Cliente | null>(null);
  const debouncedSearch = useDebounce(search, 300);

  const { mutate: deleteClient } = useClientRemove();
  const { mutate: createClient } = useClientCreate();
  const { mutate: updateClient } = useClientUpdate();
  const { data: clientes, isLoading } = useClients(debouncedSearch);

  function handleEliminar(id: string) {
    deleteClient(id);
  }

  function handleGuardar(data: ClienteFormData) {
    if(editando) {
      updateClient({
        id: editando.id,
        data
      })
    } else {
      createClient(data);
    }

    setModalOpen(false)
    setEditando(null);

  }

  function handleEditar(cliente: Cliente) {
    setEditando(cliente);
    setModalOpen(true);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Clientes</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {clientes?.length} clientes registrados
          </p>
        </div>
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
          className="gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Nuevo cliente
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o teléfono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <ClientesTable
        clientes={clientes}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />

      {/* Modal */}
      <ClienteModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onSave={handleGuardar}
        cliente={editando}
      />
    </div>
  );
}
