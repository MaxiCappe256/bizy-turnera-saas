"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const planes = [
  {
    nombre: "Free",
    descripcion: "Probá Bizy Turnera gratis para tu negocio.",
    precioMensual: 0,
    precioAnual: 0,
    destacado: false,
    caracteristicas: [
      "Hasta 50 turnos por mes",
      "1 profesional",
      "Gestión básica de clientes",
      "Servicios",
    ],
    limitaciones: [
      "Sin registro de pagos",
      "Sin estadísticas",
      "Sin soporte prioritario",
    ],
  },

  {
    nombre: "Profesional",
    descripcion: "Para negocios en crecimiento que necesitan más control.",
    precioMensual: 9900,
    precioAnual: 7900,
    destacado: true,
    caracteristicas: [
      "Turnos ilimitados",
      "Hasta 5 profesionales",
      "Gestión completa de clientes",
      "Recordatorios por WhatsApp",
      "Estadísticas y reportes",
      "Control de deudas",
      "Soporte prioritario",
    ],
    limitaciones: [],
  },
  {
    nombre: "Básico",
    descripcion: "Perfecto para empezar a digitalizar tu negocio.",
    precioMensual: 4900,
    precioAnual: 3900,
    destacado: false,
    caracteristicas: [
      "Hasta 100 turnos por mes",
      "1 profesional / usuario",
      "Gestión de clientes básica",
      "Registro de pagos",
      "Soporte por email",
    ],
    limitaciones: [
      "Sin recordatorios automáticos",
      "Sin estadísticas avanzadas",
    ],
  },
  // {
  //   nombre: "Enterprise",
  //   descripcion: "Solución a medida para negocios con múltiples sucursales.",
  //   precioMensual: 24900,
  //   precioAnual: 19900,
  //   destacado: false,
  //   caracteristicas: [
  //     "Todo lo del plan Profesional",
  //     "Sucursales ilimitadas",
  //     "Usuarios ilimitados",
  //     "API personalizada",
  //     "Integración con sistemas propios",
  //     "Capacitación incluida",
  //     "Soporte 24/7 dedicado",
  //   ],
  //   limitaciones: [],
  // },
];

function formatPrecio(precio: number) {
  return `$${precio.toLocaleString("es-AR")}`;
}

export function Precios() {
  const [anual, setAnual] = useState(false);

  return (
    <section id="precios" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Planes y precios
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Elegí el plan que mejor se adapta a tu negocio
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground">
            Sin costos ocultos. Podés cambiar de plan en cualquier momento.
          </p>

          {/* Toggle mensual / anual */}
          {/* <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-border bg-muted/50 p-1.5">
            <button
              onClick={() => setAnual(false)}
              className={cn(
                "rounded-full px-5 py-1.5 text-sm font-medium transition-all",
                !anual
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Mensual
            </button>
            <button
              onClick={() => setAnual(true)}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-1.5 text-sm font-medium transition-all",
                anual
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Anual
              <Badge className="rounded-full text-xs" variant="secondary">
                -20%
              </Badge>
            </button>
          </div> */}
        </div>

        {/* Cards */}
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {" "}
          {planes.map((plan) => (
            <div
              key={plan.nombre}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8 transition-shadow",
                plan.destacado
                  ? "border-primary bg-primary text-primary-foreground shadow-xl"
                  : "border-border bg-card text-card-foreground hover:shadow-md",
              )}
            >
              {plan.destacado && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="rounded-full bg-accent text-accent-foreground px-4 py-1 text-xs font-semibold shadow">
                    Más popular
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={cn(
                    "text-lg font-bold",
                    plan.destacado
                      ? "text-primary-foreground"
                      : "text-foreground",
                  )}
                >
                  {plan.nombre}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-sm leading-relaxed",
                    plan.destacado
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground",
                  )}
                >
                  {plan.descripcion}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span
                    className={cn(
                      "text-4xl font-extrabold tracking-tight",
                      plan.destacado
                        ? "text-primary-foreground"
                        : "text-foreground",
                    )}
                  >
                    {formatPrecio(
                      anual ? plan.precioAnual : plan.precioMensual,
                    )}
                  </span>
                  <span
                    className={cn(
                      "mb-1 text-sm",
                      plan.destacado
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground",
                    )}
                  >
                    /mes
                  </span>
                </div>
                {anual && (
                  <p
                    className={cn(
                      "mt-1 text-xs",
                      plan.destacado
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground",
                    )}
                  >
                    Facturado anualmente
                  </p>
                )}
              </div>

              <ul className="mb-8 flex flex-col gap-3">
                {plan.caracteristicas.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        plan.destacado
                          ? "text-primary-foreground"
                          : "text-primary",
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm leading-relaxed",
                        plan.destacado
                          ? "text-primary-foreground/90"
                          : "text-foreground",
                      )}
                    >
                      {c}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Link href="/registro">
                  <Button
                    className={cn(
                      "w-full rounded-full",
                      plan.destacado
                        ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                        : "",
                    )}
                    variant={plan.destacado ? "default" : "outline"}
                    size="lg"
                  >
                    Comenzar con {plan.nombre}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Todos los planes incluyen 14 días de prueba gratuita. No se requiere
          tarjeta de crédito.
        </p>
      </div>
    </section>
  );
}
