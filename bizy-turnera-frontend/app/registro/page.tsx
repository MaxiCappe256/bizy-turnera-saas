"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Zap, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registroSchema, type RegistroFormData } from "@/schemas"
import { ThemeToggle } from "@/components/theme-toggle"
import RegistroForm from "@/components/registro/RegistroForm"

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistroFormData>({
    resolver: zodResolver(registroSchema),
  })

  const onSubmit = async (data: RegistroFormData) => {
    await new Promise((r) => setTimeout(r, 1000))
    console.log("[v0] Registro attempt:", data.email, data.negocio)
    toast.success("¡Cuenta creada correctamente! Revisá tu correo para confirmarla.")
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Panel izquierdo */}
      <div className="hidden flex-col justify-between bg-primary p-12 lg:flex lg:w-2/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/10">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-primary-foreground">Bizy Turnera</span>
        </Link>

        <div className="flex flex-col gap-6">
          {[
            { num: "01", titulo: "Creá tu cuenta", desc: "Registrá tu negocio en menos de 2 minutos, sin tarjeta." },
            { num: "02", titulo: "Configurá tus servicios", desc: "Agregá los servicios que ofrecés con duración y precios." },
            { num: "03", titulo: "Empezá a tomar turnos", desc: "Tus clientes ya pueden reservar y vos organizarte mejor." },
          ].map((step) => (
            <div key={step.num} className="flex gap-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary-foreground/30 text-xs font-bold text-primary-foreground">
                {step.num}
              </span>
              <div>
                <p className="font-semibold text-primary-foreground">{step.titulo}</p>
                <p className="mt-0.5 text-sm text-primary-foreground/70">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-primary-foreground/60">© {new Date().getFullYear()} Bizy Turnera</p>
      </div>

      {/* Formulario */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between px-8 py-6">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">Bizy Turnera</span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">
              ¿Ya tenés cuenta?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Iniciá sesión
              </Link>
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-8 pb-12">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Creá tu cuenta</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                14 días gratis, sin tarjeta de crédito.
              </p>
            </div>

            <RegistroForm/>
          </div>
        </div>
      </div>
    </div>
  )
}
