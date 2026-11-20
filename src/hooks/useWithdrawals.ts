import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Withdrawal, WithdrawalRequest } from '@/types/withdrawal';

export function useWithdrawals() {
  return useQuery({
    queryKey: ['withdrawals'],
    queryFn: () => api.get<Withdrawal[]>('/wallet/withdrawals'),
    staleTime: 30000,
  });
}

export function useCreateWithdrawal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WithdrawalRequest) => api.post<Withdrawal>('/wallet/withdraw', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      queryClient.invalidateQueries({ queryKey: ['withdrawals'] });
    },
  });
}
