import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@/lib/api';
import type { BankAccount, AddBankFormData } from '@/types/withdrawal';
import {
  setBankAccounts,
  addBankAccount,
  removeBankAccount,
  selectBankAccount,
} from '@/store/slices/bankAccountsSlice';
import type { RootState } from '@/store';

export function useBankAccounts() {
  const dispatch = useDispatch();
  const accounts = useSelector((state: RootState) => state.bankAccounts.accounts);
  const selectedAccountId = useSelector((state: RootState) => state.bankAccounts.selectedAccountId);

  const { data, isLoading } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: () => api.get<BankAccount[]>('/wallet/bank-accounts'),
  });

  useEffect(() => {
    if (data) {
      dispatch(setBankAccounts(data));
    }
  }, [data, dispatch]);

  const queryClient = useQueryClient();

  const addAccountMutation = useMutation({
    mutationFn: (data: AddBankFormData) => api.post<BankAccount>('/wallet/bank-accounts/verify', data),
    onSuccess: (newAccount) => {
      dispatch(addBankAccount(newAccount));
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    },
  });

  const removeAccountMutation = useMutation({
    mutationFn: (accountId: string) => api.delete(`/wallet/bank-accounts/${accountId}`),
    onSuccess: (_, accountId) => {
      dispatch(removeBankAccount(accountId));
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    },
  });

  return {
    accounts,
    selectedAccountId,
    isLoading,
    addAccount: addAccountMutation.mutateAsync,
    removeAccount: removeAccountMutation.mutateAsync,
    selectAccount: (accountId: string | null) => dispatch(selectBankAccount(accountId)),
  };
}
