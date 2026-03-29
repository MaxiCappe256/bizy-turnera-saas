import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockTurnos } from "@/mock/data"
import { EstadoBadge } from "@/components/panel/turnos/estado-badge"

export function TurnosRecientes() {
  const recientes = mockTurnos.slice(0, 5)

  return (
    <Card className="border border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Turnos recientes</CardTitle>
        <Link href="/panel/turnos">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
            Ver todos
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Servicio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Fecha y hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Estado</th>
              </tr>
            </thead>
            <tbody>
              {recientes.map((turno, i) => (
                <tr
                  key={turno.id}
                  className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${
                    i % 2 === 0 ? "" : ""
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-foreground">{turno.clienteNombre}</td>
                  <td className="px-6 py-4 text-muted-foreground">{turno.servicioNombre}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {turno.fecha} · {turno.hora}
                  </td>
                  <td className="px-6 py-4">
                    <EstadoBadge estado={turno.estado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
