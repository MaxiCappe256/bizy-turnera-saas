"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Building2, Bell, Palette, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ConfiguracionPage() {
  const [negocio, setNegocio] = useState({
    nombre: "Barbería El Filo",
    telefono: "+54 11 2345-6789",
    email: "bifilo@correo.com",
    direccion: "Av. Corrientes 1234, CABA",
    horarioApertura: "09:00",
    horarioCierre: "20:00",
  })

  const [notificaciones, setNotificaciones] = useState({
    recordatoriosTurnos: true,
    resumenDiario: false,
    alertasDeuda: true,
    nuevosPagos: true,
  })

  function handleGuardarNegocio(e: React.FormEvent) {
    e.preventDefault()
    toast.success("Configuración del negocio guardada")
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Configuración</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Administrá la información de tu negocio y las preferencias del sistema.
        </p>
      </div>

      <Tabs defaultValue="negocio">
        <TabsList className="mb-6">
          <TabsTrigger value="negocio" className="gap-2">
            <Building2 className="h-3.5 w-3.5" />
            Mi negocio
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="gap-2">
            <Bell className="h-3.5 w-3.5" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="apariencia" className="gap-2">
            <Palette className="h-3.5 w-3.5" />
            Apariencia
          </TabsTrigger>
          <TabsTrigger value="cuenta" className="gap-2">
            <Shield className="h-3.5 w-3.5" />
            Cuenta
          </TabsTrigger>
        </TabsList>

        {/* Negocio */}
        <TabsContent value="negocio">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Información del negocio</CardTitle>
              <CardDescription>
                Esta información se mostrará a tus clientes en las confirmaciones de turno.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGuardarNegocio} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="nombre-negocio">Nombre del negocio</Label>
                    <Input
                      id="nombre-negocio"
                      value={negocio.nombre}
                      onChange={(e) => setNegocio({ ...negocio, nombre: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="telefono-negocio">Teléfono</Label>
                    <Input
                      id="telefono-negocio"
                      value={negocio.telefono}
                      onChange={(e) => setNegocio({ ...negocio, telefono: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email-negocio">Correo electrónico</Label>
                    <Input
                      id="email-negocio"
                      type="email"
                      value={negocio.email}
                      onChange={(e) => setNegocio({ ...negocio, email: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                      id="direccion"
                      value={negocio.direccion}
                      onChange={(e) => setNegocio({ ...negocio, direccion: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="apertura">Horario de apertura</Label>
                    <Input
                      id="apertura"
                      type="time"
                      value={negocio.horarioApertura}
                      onChange={(e) => setNegocio({ ...negocio, horarioApertura: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="cierre">Horario de cierre</Label>
                    <Input
                      id="cierre"
                      type="time"
                      value={negocio.horarioCierre}
                      onChange={(e) => setNegocio({ ...negocio, horarioCierre: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Guardar cambios</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificaciones */}
        <TabsContent value="notificaciones">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Preferencias de notificaciones</CardTitle>
              <CardDescription>
                Controlá qué alertas querés recibir sobre la actividad de tu negocio.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-0">
              {[
                { key: "recordatoriosTurnos", label: "Recordatorios de turnos", desc: "Recibí un aviso antes de cada turno programado." },
                { key: "resumenDiario", label: "Resumen diario", desc: "Un email con el resumen de actividad del día." },
                { key: "alertasDeuda", label: "Alertas de deuda", desc: "Notificaciones cuando un cliente tenga saldo pendiente." },
                { key: "nuevosPagos", label: "Nuevos pagos", desc: "Confirmación cada vez que se registre un pago." },
              ].map((item, i) => (
                <div key={item.key}>
                  {i > 0 && <Separator className="my-4" />}
                  <div className="flex items-center justify-between gap-4 py-1">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notificaciones[item.key as keyof typeof notificaciones]}
                      onCheckedChange={(v) => {
                        setNotificaciones({ ...notificaciones, [item.key]: v })
                        toast.success(v ? `${item.label} activadas` : `${item.label} desactivadas`)
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Apariencia */}
        <TabsContent value="apariencia">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Apariencia</CardTitle>
              <CardDescription>
                Personalizá el aspecto visual de tu panel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Modo oscuro / claro</p>
                  <p className="text-xs text-muted-foreground">
                    Cambiá entre el tema oscuro y claro según tu preferencia.
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cuenta */}
        <TabsContent value="cuenta">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Datos de la cuenta</CardTitle>
              <CardDescription>
                Gestioná tu cuenta y el acceso al sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>Nombre completo</Label>
                  <Input defaultValue="Rodrigo Vega" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Correo electrónico</Label>
                  <Input defaultValue="rodrigo@bifilo.com" type="email" />
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-medium text-foreground">Cambiar contraseña</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label>Contraseña actual</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Nueva contraseña</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => toast.success("Datos de cuenta actualizados")}>
                  Guardar cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
