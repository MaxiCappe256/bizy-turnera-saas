import Link from "next/link"
import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-border bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">Bizy Turnera</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              La plataforma más completa para gestionar turnos, clientes y pagos de tu negocio de servicios.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              hola@bizyturnera.com
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Producto</h4>
            <ul className="flex flex-col gap-3">
              {["Funcionalidades", "Precios", "Integraciones", "Novedades"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Empresa</h4>
            <ul className="flex flex-col gap-3">
              {["Sobre nosotros", "Blog", "Términos y condiciones", "Política de privacidad"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bizy Turnera. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Hecho con dedicación para negocios latinoamericanos
          </p>
        </div>
      </div>
    </footer>
  )
}
