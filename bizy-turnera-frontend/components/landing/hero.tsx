import Link from "next/link"
import { ArrowRight, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background px-6 pb-24 pt-20 text-center md:pt-32">
      {/* Fondo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.48 0.18 255 / 0.08), transparent)",
        }}
      />

      <div className="mx-auto max-w-3xl">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <Badge variant="secondary" className="gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            La plataforma N°1 para gestionar tu negocio
          </Badge>
        </div>

        {/* Heading */}
        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Gestioná tus turnos{" "}
          <span className="text-primary">sin complicaciones</span>
        </h1>

        {/* Subtítulo */}
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Bizy Turnera simplifica la gestión de turnos, clientes y pagos para barberías, clínicas,
          nutricionistas, veterinarias y cualquier negocio de servicios.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/registro">
            <Button size="lg" className="gap-2 rounded-full px-8 text-base">
              Comenzar gratis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/panel">
            <Button variant="outline" size="lg" className="gap-2 rounded-full px-8 text-base">
              <Calendar className="h-4 w-4" />
              Ver demo en vivo
            </Button>
          </Link>
        </div>

        {/* Social proof */}
        <p className="mt-8 text-sm text-muted-foreground">
          Más de{" "}
          <span className="font-semibold text-foreground">2.400 negocios</span>{" "}
          ya organizan sus turnos con Bizy Turnera
        </p>
      </div>

      {/* Dashboard preview card */}
      <div className="mx-auto mt-16 max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/70" />
            <div className="h-3 w-3 rounded-full bg-green-400/70" />
            <span className="ml-2 text-xs text-muted-foreground">panel.bizyturnera.com</span>
          </div>
          <div className="grid grid-cols-3 gap-4 p-6 md:grid-cols-4">
            {/* Mini stat cards */}
            {[
              { label: "Ingresos del mes", value: "$128.400", color: "text-primary" },
              { label: "Turnos hoy", value: "5", color: "text-accent" },
              { label: "Clientes activos", value: "247", color: "text-foreground" },
              { label: "Deuda pendiente", value: "$5.500", color: "text-destructive" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-background p-4 text-left">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className={`mt-1 text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border px-6 pb-6">
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">Turnos de hoy</div>
              {[
                { nombre: "Lucía Fernández", servicio: "Corte de cabello", hora: "10:00", estado: "Completado" },
                { nombre: "Marcos Rodríguez", servicio: "Corte + Barba", hora: "11:00", estado: "Pendiente" },
                { nombre: "Valentina Gómez", servicio: "Consulta", hora: "12:00", estado: "Cancelado" },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between border-t border-border px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.nombre}</p>
                    <p className="text-xs text-muted-foreground">{t.servicio} · {t.hora}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    t.estado === "Completado" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                    t.estado === "Pendiente" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>{t.estado}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
