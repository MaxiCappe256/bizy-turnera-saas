import { api } from "@/lib/axios";
import type { Appointment } from "@/schemas";
import { useQuery } from "@tanstack/react-query";

export function useAppointments(
  limit?: number,
  offset?: number,
  pendingPayment?: boolean
) {
  const hasServerPagination =
    limit !== undefined || offset !== undefined;

  const query = useQuery({
    queryKey: hasServerPagination
      ? ["appointments", limit ?? null, offset ?? null, pendingPayment ?? null]
      : ["appointments", pendingPayment ?? null],

    queryFn: async (): Promise<Appointment[]> => {
      const res = await api.get<Appointment[]>("/appointments", {
        params: {
          ...(hasServerPagination
            ? {
              ...(limit !== undefined ? { limit } : {}),
              ...(offset !== undefined ? { offset } : {}),
            }
            : {}),
          ...(pendingPayment ? { pendingPayment: true } : {}),
        },
      });

      return res.data;
    },
  });

  return {
    appointments: query.data ?? [],
    ...query,
  };
}