import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BankAccount } from '@/types/withdrawal';

interface BankAccountsState {
  accounts: BankAccount[];
  selectedAccountId: string | null;
}

const initialState: BankAccountsState = {
  accounts: [],
  selectedAccountId: null,
};

const bankAccountsSlice = createSlice({
  name: 'bankAccounts',
  initialState,
  reducers: {
    setBankAccounts: (state, action: PayloadAction<BankAccount[]>) => {
      state.accounts = action.payload;
    },
    addBankAccount: (state, action: PayloadAction<BankAccount>) => {
      state.accounts.push(action.payload);
    },
    removeBankAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter(acc => acc.id !== action.payload);
      if (state.selectedAccountId === action.payload) {
        state.selectedAccountId = null;
      }
    },
    selectBankAccount: (state, action: PayloadAction<string | null>) => {
      state.selectedAccountId = action.payload;
    },
    clearBankAccounts: (state) => {
      state.accounts = [];
      state.selectedAccountId = null;
    },
  },
});

export const {
  setBankAccounts,
  addBankAccount,
  removeBankAccount,
  selectBankAccount,
  clearBankAccounts,
} = bankAccountsSlice.actions;

export default bankAccountsSlice.reducer;
