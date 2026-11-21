import BoxCard from "@/components/reusable/BoxCard";
import { images } from "@/constants/images";
import { useBalance } from "@/hooks/useBalance";
import { formatMoney } from "@/lib/formatMoney";
import { PropagateLoader } from "react-spinners";

export default function WithdrawPage() {
  const {
    data: balance,
    isLoading: balanceLoading,
    isError: balanceError,
    refetch: refetchBalance,
  } = useBalance();

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
            {balanceLoading ? (
              <PropagateLoader color="#16A34A" size={16} />
            ) : balanceError ? (
              <div className="flex items-center gap-3">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  Unavailable
                </h3>
                <button
                  onClick={() => refetchBalance()}
                  className="text-green-700 text-sm font-semibold hover:underline"
                >
                  Retry
                </button>
              </div>
            ) : (
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {formatMoney(balance?.available ?? 0)}
              </h3>
            )}
          </div>
        </div>
      </BoxCard>

      {/* Withdrawals are not available yet */}
      <BoxCard>
        <p className="text-gray-600 text-center py-8">
          Withdrawals are coming soon. You&apos;ll be able to cash out your
          earnings here once the feature launches.
        </p>
      </BoxCard>
    </div>
  );
}
