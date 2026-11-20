import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import BoxCard from "@/components/reusable/BoxCard";
import { images } from "@/constants/images";
import { useBalance } from "@/hooks/useBalance";
import { useWithdrawals, useCreateWithdrawal } from "@/hooks/useWithdrawals";
import { useBankAccounts } from "@/hooks/useBankAccounts";
import { formatMoney } from "@/lib/formatMoney";
import type { WithdrawalFormData, AddBankFormData, Withdrawal } from "@/types/withdrawal";
import { PropagateLoader } from "react-spinners";

const withdrawalSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    "Amount must be greater than 0"
  ),
  method: z.literal("bank_transfer"),
  bankAccountId: z.string().min(1, "Please select a bank account"),
});

const addBankSchema = z.object({
  accountNumber: z.string().min(10, "Account number must be at least 10 digits").max(11, "Account number must be at most 11 digits"),
  bankName: z.string().min(1, "Bank name is required"),
});

export default function WithdrawPage() {
  const { data: balance, isLoading: balanceLoading } = useBalance();
  const { data: withdrawals, isLoading: withdrawalsLoading } = useWithdrawals();
  const createWithdrawal = useCreateWithdrawal();
  const {
    accounts,
    selectedAccountId,
    isLoading: accountsLoading,
    addAccount,
    removeAccount,
    selectAccount,
  } = useBankAccounts();

  const [showAddBank, setShowAddBank] = useState(false);

  const {
    register: registerWithdrawal,
    handleSubmit: handleSubmitWithdrawal,
    formState: { errors: withdrawalErrors, isSubmitting },
    setValue: setWithdrawalValue,
    watch: watchWithdrawal,
  } = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: "",
      method: "bank_transfer",
      bankAccountId: "",
    },
  });

  const {
    register: registerAddBank,
    handleSubmit: handleSubmitAddBank,
    formState: { errors: addBankErrors, isSubmitting: isAddingBank },
    reset: resetAddBank,
  } = useForm<AddBankFormData>({
    resolver: zodResolver(addBankSchema),
    defaultValues: {
      accountNumber: "",
      bankName: "",
    },
  });

  const watchedBankAccountId = watchWithdrawal("bankAccountId");

  const onWithdrawalSubmit = async (data: WithdrawalFormData) => {
    try {
      await createWithdrawal.mutateAsync({
        amount: parseFloat(data.amount),
        method: data.method,
        bankAccountId: data.bankAccountId,
      });
      setWithdrawalValue("amount", "");
    } catch (error) {
      console.error("Withdrawal failed:", error);
    }
  };

  const onAddBankSubmit = async (data: AddBankFormData) => {
    try {
      await addAccount(data);
      resetAddBank();
      setShowAddBank(false);
    } catch (error) {
      console.error("Failed to add bank account:", error);
    }
  };

  const handleRemoveAccount = async (accountId: string) => {
    try {
      await removeAccount(accountId);
      if (selectedAccountId === accountId) {
        selectAccount(null);
        setWithdrawalValue("bankAccountId", "");
      }
    } catch (error) {
      console.error("Failed to remove bank account:", error);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-5 py-5">
      <h1 className="text-2xl font-bold text-gray-900">Withdraw</h1>

      {/* Balance Card */}
      <BoxCard
        padding="p-0"
        className="overflow-hidden bg-[#effbf5] min-h-[160px] sm:min-h-[180px]"
      >
        <div className="flex flex-col justify-between space-y-3 sm:space-y-5 p-4 h-full">
          <div className="bg-green-200 p-[3px] w-fit rounded-xl">
            <img
              src={images.walletIcon}
              alt="Wallet"
              className="h-10 w-10 sm:h-12 sm:w-12"
            />
          </div>
          <div className="space-y-2 sm:space-y-4">
            <p className="text-gray-500 text-base sm:text-xl font-medium mb-1">
              Available Balance
            </p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {balanceLoading ? "Loading..." : formatMoney(balance?.available || 0)}
            </h3>
          </div>
        </div>
      </BoxCard>

      {/* Withdrawal Form */}
      <BoxCard className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Withdraw (NAIRA)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            {...registerWithdrawal("amount")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          />
          {withdrawalErrors.amount && (
            <p className="text-red-500 text-sm mt-1">{withdrawalErrors.amount.message}</p>
          )}
        </div>

        {/* Bank Account Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Bank Account
            </label>
            <button
              type="button"
              onClick={() => setShowAddBank(!showAddBank)}
              className="text-primary-dark text-sm font-medium hover:text-primary-dark flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add New Bank
            </button>
          </div>

          {accountsLoading ? (
            <div className="flex justify-center py-4">
              <PropagateLoader color="#16A34A" size={12} />
            </div>
          ) : accounts && accounts.length > 0 ? (
            <div className="space-y-2">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                    watchedBankAccountId === account.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => {
                    selectAccount(account.id);
                    setWithdrawalValue("bankAccountId", account.id);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">{account.bankName}</p>
                        {account.isVerified && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        **** {account.accountNumber.slice(-4)}
                      </p>
                      {account.accountName && (
                        <p className="text-xs text-gray-400">{account.accountName}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveAccount(account.id);
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">
              No bank accounts added. Click "Add New Bank" to add one.
            </p>
          )}

          {withdrawalErrors.bankAccountId && (
            <p className="text-red-500 text-sm mt-1">{withdrawalErrors.bankAccountId.message}</p>
          )}
        </div>

        {/* Add New Bank Form */}
        {showAddBank && (
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Add New Bank Account</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Your bank account will be verified using Paystack. Please ensure the account details are correct.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name
              </label>
              <input
                type="text"
                placeholder="e.g., Access Bank, GTBank"
                {...registerAddBank("bankName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              />
              {addBankErrors.bankName && (
                <p className="text-red-500 text-sm mt-1">{addBankErrors.bankName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                type="text"
                placeholder="Enter your 10 or 11 digit account number"
                {...registerAddBank("accountNumber")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              />
              {addBankErrors.accountNumber && (
                <p className="text-red-500 text-sm mt-1">{addBankErrors.accountNumber.message}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddBank(false);
                  resetAddBank();
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitAddBank(onAddBankSubmit)}
                disabled={isAddingBank}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingBank ? "Verifying..." : "Add & Verify"}
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmitWithdrawal(onWithdrawalSubmit)}
          disabled={isSubmitting || createWithdrawal.isPending}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting || createWithdrawal.isPending ? "Processing..." : "Withdraw"}
        </button>
      </BoxCard>

      {/* Recent Withdrawals */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Withdrawals</h2>
        {withdrawalsLoading ? (
          <BoxCard>
            <div className="flex justify-center py-4">
              <PropagateLoader color="#16A34A" />
            </div>
          </BoxCard>
        ) : withdrawals && withdrawals.length > 0 ? (
          <div className="space-y-3">
            {withdrawals.map((withdrawal: Withdrawal) => (
              <BoxCard key={withdrawal.id} className="flex items-center justify-between p-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{formatMoney(withdrawal.amount)}</p>
                  <p className="text-sm text-gray-500">
                    {withdrawal.bankAccount.bankName} - ****{withdrawal.bankAccount.accountNumber.slice(-4)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(withdrawal.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      withdrawal.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : withdrawal.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : withdrawal.status === "approved"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                  </span>
                </div>
              </BoxCard>
            ))}
          </div>
        ) : (
          <BoxCard>
            <p className="text-gray-600 text-center py-8">No withdrawals yet</p>
          </BoxCard>
        )}
      </div>
    </div>
  );
}
