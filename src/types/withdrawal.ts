export interface Balance {
  available: number;
  totalEarned: number;
  pending: number;
}

export interface BankAccount {
  id: string;
  accountNumber: string;
  bankName: string;
  accountName: string;
  isVerified: boolean;
}

export interface WithdrawalRequest {
  amount: number;
  method: "bank_transfer";
  bankAccountId: string;
}

export interface Withdrawal {
  id: string;
  amount: number;
  method: string;
  status: "pending" | "approved" | "paid" | "rejected";
  createdAt: string;
  bankAccount: BankAccount;
}

export interface WithdrawalFormData {
  amount: string;
  method: "bank_transfer";
  bankAccountId: string;
}

export interface AddBankFormData {
  accountNumber: string;
  bankName: string;
}
