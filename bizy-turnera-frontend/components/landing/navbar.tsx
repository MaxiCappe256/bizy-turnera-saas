"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function LandingNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Bizy Turnera
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#beneficios" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Beneficios
          </a>
          <a href="#precios" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Precios
          </a>
          <a href="#contacto" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Contacto
          </a>
        </nav>

        {/* Actions desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm">Iniciar sesión</Button>
          </Link>
          <Link href="/registro">
            <Button size="sm">Empezar gratis</Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-6 pb-6 md:hidden">
          <nav className="flex flex-col gap-4 pt-4">
            <a href="#beneficios" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Beneficios</a>
            <a href="#precios" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Precios</a>
            <a href="#contacto" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Contacto</a>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/login"><Button variant="outline" className="w-full" size="sm">Iniciar sesión</Button></Link>
              <Link href="/registro"><Button className="w-full" size="sm">Empezar gratis</Button></Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
