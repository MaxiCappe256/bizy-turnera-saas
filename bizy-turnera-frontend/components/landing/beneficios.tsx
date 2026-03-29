import {
  Calendar,
  Users,
  CreditCard,
  Bell,
  BarChart3,
  Shield,
} from "lucide-react"

const beneficios = [
  {
    icon: Calendar,
    titulo: "Gestión de turnos inteligente",
    descripcion:
      "Organizá todos tus turnos en un calendario visual. Evitá superposiciones y nunca más pierdas un cliente por desorganización.",
  },
  {
    icon: Users,
    titulo: "Base de clientes centralizada",
    descripcion:
      "Guardá el historial de cada cliente: turnos anteriores, servicios preferidos y estado de deuda en un solo lugar.",
  },
  {
    icon: CreditCard,
    titulo: "Control de pagos y deudas",
    descripcion:
      "Registrá pagos en efectivo o transferencia, llevá el control de deudas y generá reportes de ingresos al instante.",
  },
  {
    icon: Bell,
    titulo: "Recordatorios automáticos",
    descripcion:
      "El sistema recuerda a tus clientes sus turnos por WhatsApp o email, reduciendo las ausencias y cancelaciones.",
  },
  {
    icon: BarChart3,
    titulo: "Estadísticas y reportes",
    descripcion:
      "Visualizá tus ingresos, servicios más solicitados y horarios pico para tomar mejores decisiones de negocio.",
  },
  {
    icon: Shield,
    titulo: "Seguridad y privacidad",
    descripcion:
      "Tus datos y los de tus clientes están protegidos con cifrado de nivel empresarial. Cumplimos con la normativa vigente.",
  },
]

export function Beneficios() {
  return (
    <section id="beneficios" className="bg-muted/40 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Por qué elegirnos
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Todo lo que tu negocio necesita en un solo lugar
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Diseñado específicamente para negocios de servicios que quieren crecer
            sin perder tiempo en tareas administrativas.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((b) => {
            const Icon = b.icon
            return (
              <div
                key={b.titulo}
                className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">{b.titulo}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{b.descripcion}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
