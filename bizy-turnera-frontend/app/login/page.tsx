"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Panel izquierdo — decorativo */}
      <div className="hidden flex-col justify-between bg-primary p-12 lg:flex lg:w-2/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/10">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-primary-foreground">
            Bizy Turnera
          </span>
        </Link>

        <div>
          <blockquote className="text-xl leading-relaxed text-primary-foreground">
            &ldquo;Desde que uso Bizy Turnera organicé mi barbería
            completamente. Nunca más perdí un turno ni tuve que llamar a mis
            clientes para recordarles.&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold text-primary-foreground">
              Rodrigo Vega
            </p>
            <p className="text-sm text-primary-foreground/70">
              Dueño de Barbería El Filo, Córdoba
            </p>
          </div>
        </div>

        <p className="text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} Bizy Turnera
        </p>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-6">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              Bizy Turnera
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">
              ¿No tenés cuenta?{" "}
              <Link
                href="/registro"
                className="font-medium text-primary hover:underline"
              >
                Registrate
              </Link>
            </span>
          </div>
        </div>

        {/* Form container */}
        <div className="flex flex-1 items-center justify-center px-8 pb-12">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Bienvenido de vuelta
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Iniciá sesión para acceder a tu panel
              </p>
            </div>

            <LoginForm />

            {/* Demo shortcut */}
            <div className="mt-8 rounded-lg border border-border bg-muted/50 p-4 text-center">
              <p className="text-xs text-muted-foreground">
                Demo rápida:{" "}
                <Link
                  href="/panel"
                  className="font-medium text-primary hover:underline"
                >
                  Ir al panel sin iniciar sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
