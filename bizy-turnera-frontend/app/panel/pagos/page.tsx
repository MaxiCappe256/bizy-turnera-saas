"use client";

import { useState } from "react";
import { Plus, CreditCard, Banknote, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PagoModal } from "@/components/panel/pagos/pago-modal";
import { usePayments } from "@/hooks/panel/payments/usePayments";
import { useClients } from "@/hooks/panel/clients/useClients";

export default function PagosPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const { data: pagos = [] } = usePayments();
  const { data: clientes = [] } = useClients();

  console.log(pagos);

  // function handleCrear(data: Omit<Pago, "id">) {
  //   const nuevo: Pago = { id: `p${Date.now()}`, ...data };
  //   setPagos((prev) => [nuevo, ...prev]);
  //   setModalOpen(false);
  // }

  const totalEfectivo = pagos
    .filter((p: any) => p.metodo === "efectivo")
    .reduce((sum: any, p: any) => sum + p.monto, 0);
  const totalTransferencia = pagos
    .filter((p: any) => p.metodo === "transferencia")
    .reduce((sum: any, p: any) => sum + p.monto, 0);
  const totalGeneral = pagos.reduce((sum: any, p: any) => sum + p.monto, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Pagos</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {pagos.length} transacciones registradas
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Registrar pago
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <ArrowRightLeft className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total recaudado</p>
                <p className="text-lg font-bold text-foreground">
                  ${totalGeneral.toLocaleString("es-AR")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <Banknote className="h-4 w-4 text-green-700 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Efectivo</p>
                <p className="text-lg font-bold text-foreground">
                  ${totalEfectivo.toLocaleString("es-AR")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                <CreditCard className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Transferencia</p>
                <p className="text-lg font-bold text-foreground">
                  ${totalTransferencia.toLocaleString("es-AR")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      {pagos.length === 0 ? (
        <Card className="border border-border">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-base font-medium text-foreground">
              No hay pagos registrados
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Registrá los pagos de tus clientes para llevar un control de
              ingresos.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Historial de transacciones
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                      Concepto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                      Método
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">
                      Monto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map((pago: any) => (
                    <tr
                      key={pago.id}
                      className="border-b border-border last:border-0 transition-colors hover:bg-muted/30"
                    >
                      <td className="px-6 py-4 font-medium text-foreground">
                        {pago.client.fullName}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {pago.concepto}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {pago.paidAt}
                      </td>
                      <td className="px-6 py-4">
                        {pago.method === "cash" ? (
                          <Badge
                            variant="outline"
                            className="rounded-full bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 text-xs gap-1"
                          >
                            <Banknote className="h-3 w-3" />
                            Efectivo
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="rounded-full bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800 text-xs gap-1"
                          >
                            <CreditCard className="h-3 w-3" />
                            Transferencia
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-foreground">
                        ${pago.amount.toLocaleString("es-AR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <PagoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        // onGuardar={handleCrear}
        clientes={clientes}
      />
    </div>
  );
}
