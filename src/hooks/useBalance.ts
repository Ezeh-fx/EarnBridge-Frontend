import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Balance } from '@/types/withdrawal';

export function useBalance() {
  return useQuery({
    queryKey: ['balance'],
    queryFn: () => api.get<Balance>('/wallet/balance'),
    staleTime: 30000, // 30 seconds
  });
}
