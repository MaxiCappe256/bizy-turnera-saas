import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export function useClients(search: string) {
  return useQuery({
    queryKey: ['clients', search],
    queryFn: async () => {
      const res = await api.get('/clients', {
        params: {
          term: search || undefined,
        }
      });
      return res.data;
    },
  });
}
