"use client";

import { DashboardStats } from "@/components/panel/dashboard/stats";
import { TurnosRecientes } from "@/components/panel/dashboard/turnos-recientes";
import { useProfile } from "@/hooks/profile/useProfile";

export default function PanelPage() {
  const { data: profile } = useProfile();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Buen día, {profile?.fullName}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Aquí tenés un resumen de lo que está pasando en tu negocio hoy.
        </p>
      </div>
      <DashboardStats />
      <TurnosRecientes />
    </div>
  );
}
