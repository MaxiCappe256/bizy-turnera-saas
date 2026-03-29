import { DollarSign, Calendar, AlertCircle, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { mockStats } from "@/mock/data"

const stats = [
  {
    label: "Ingresos del mes",
    value: `$${mockStats.ingresosMes.toLocaleString("es-AR")}`,
    sub: `$${mockStats.ingresosHoy.toLocaleString("es-AR")} hoy`,
    icon: DollarSign,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Turnos de hoy",
    value: mockStats.turnosHoy.toString(),
    sub: `${mockStats.turnosCompletadosHoy} completados`,
    icon: Calendar,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    label: "Clientes activos",
    value: mockStats.clientesActivos.toString(),
    sub: "Registrados en el sistema",
    icon: Users,
    color: "text-foreground",
    bg: "bg-muted",
  },
  {
    label: "Deuda pendiente",
    value: `$${mockStats.deudaPendienteTotal.toLocaleString("es-AR")}`,
    sub: "3 clientes con saldo",
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
