import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EstadoTurno } from "@/schemas";

const estadoConfig: Record<EstadoTurno, { label: string; className: string }> =
  {
    PENDING: {
      label: "Pendiente",
      className:
        "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
    },
    pending: {
      label: "Pendiente",
      className:
        "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
    },
    COMPLETED: {
      label: "Completado",
      className:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    },
    completed: {
      label: "Completado",
      className:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    },
    CANCELED: {
      label: "Cancelado",
      className:
        "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    },
    canceled: {
      label: "Cancelado",
      className:
        "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    },
  };

export function EstadoBadge({ estado }: { estado: EstadoTurno }) {
  const config = estadoConfig[estado];

  if (!config) return null;
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full text-xs font-medium", config.className)}
    >
      {config.label}
    </Badge>
  );
}
