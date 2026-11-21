import BoxCard from "@/components/reusable/BoxCard";
import { images } from "@/constants/images";
import { ArrowUpRight, ArrowRight, Copy } from "lucide-react";
import { formatMoney } from "@/lib/formatMoney";
import { useBalance } from "@/hooks/useBalance";
import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.user.profile);
  const {
    data: balance,
    isLoading: balanceLoading,
    isError: balanceError,
    refetch: refetchBalance,
  } = useBalance();

  const displayName = profile?.displayName || "there";
  const formatBalance = (value: number | undefined) =>
    balanceLoading
      ? "—"
      : balanceError
        ? "Unavailable"
        : formatMoney(value ?? 0);
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-5 py-5">
      {/* Hero Banner */}
      <BoxCard className="bg-gradient-to-r from-green-600 to-green-300 text-white border-none overflow-hidden min-h-[200px] sm:h-[250px] lg:h-[35vh] flex items-center">
        <div className="flex items-center justify-between w-full h-auto">
          <div className="flex-1 px-4 sm:px-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-green-50">
              {greeting}!
            </h2>
            <h1 className="text-white font-semibold mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-5xl">
              {displayName}👋
            </h1>
            <p className="text-white text-sm sm:text-base">
              Click, watch and earn with EarnBridge
            </p>
          </div>
          <img
            src={images.playGiftEarn}
            alt="Play, Gift, and Earn"
            className="w-[200px] sm:w-[300px] lg:w-[430px] h-auto hidden sm:block object-contain"
          />
        </div>
      </BoxCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <BoxCard
          padding="p-0"
          className="overflow-hidden bg-[#effbf5] min-h-[160px] sm:min-h-[180px] lg:h-[34vh]"
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
                Total Earned
              </p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {formatBalance(balance?.totalEarned)}
              </h3>
              <h3 className="text-xs sm:text-sm text-primary-dark font-semibold">
                {balanceLoading || balanceError
                  ? ""
                  : `${formatMoney(balance?.pending ?? 0)} pending`}
              </h3>
            </div>
          </div>
        </BoxCard>

        <BoxCard
          padding="p-0"
          className="overflow-hidden bg-[#effbf5] min-h-[160px] sm:min-h-[180px] lg:h-[34vh]"
        >
          <div className="flex flex-col justify-between space-y-3 sm:space-y-5 p-4 h-full">
            <div className="bg-green-200 p-[3px] w-fit rounded-xl">
              <img
                src={images.videoPlayerIcon}
                alt="Video"
                className="h-10 w-10 sm:h-12 sm:w-12 rotate-6"
              />
            </div>
            <div className="space-y-2 sm:space-y-4">
              <p className="text-gray-500 text-base sm:text-xl font-medium mb-1">
                Video Watched
              </p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                0
              </h3>
              <h3 className="text-xs sm:text-sm text-primary-dark font-semibold">
                +0 today
              </h3>
            </div>
          </div>
        </BoxCard>

        <BoxCard
          padding="p-0"
          className="overflow-hidden bg-[#effbf5] min-h-[160px] sm:min-h-[180px] lg:h-[34vh]"
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
                {formatBalance(balance?.available)}
              </h3>
              {balanceError ? (
                <button
                  onClick={() => refetchBalance()}
                  className="bg-primary-dark text-white px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium w-fit"
                >
                  Retry
                </button>
              ) : (
                <button
                  onClick={() => navigate("/app/withdraw")}
                  className="bg-primary-dark text-white px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium w-fit"
                >
                  Withdraw
                </button>
              )}
            </div>
          </div>
        </BoxCard>

        <BoxCard
          padding="p-0"
          className="overflow-hidden bg-[#effbf5] min-h-[160px] sm:min-h-[180px] lg:h-[34vh]"
        >
          <div className="flex flex-col justify-between space-y-3 sm:space-y-5 p-4 h-full">
            <div className="bg-[#fafdfa] p-[3px] w-fit rounded-xl">
              <img
                src={images.referrerPeopleicon}
                alt="Referrals"
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
              />
            </div>
            <div className="space-y-2 sm:space-y-4">
              <p className="text-gray-500 text-base sm:text-xl font-medium mb-1">
                Referrals
              </p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                0
              </h3>
              <h3 className="text-xs sm:text-sm text-primary-dark font-semibold">
                +0 this week
              </h3>
            </div>
          </div>
        </BoxCard>
      </div>

      {/* Quick Actions Section */}
      <div className="hidden sm:flex flex-col">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Quick Actions
          </h3>
          <button className="text-green-600 text-sm font-medium hover:text-green-700 flex items-center gap-1">
            View All <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <BoxCard
            padding="p-0"
            className="overflow-hidden bg-[#effbf5] min-h-[140px] sm:min-h-[160px] lg:h-[30vh]"
          >
            <div className="flex flex-col justify-between space-y-3 sm:space-y-5 p-4 h-full">
              <div className="bg-green-200 p-[3px] w-fit rounded-xl">
                <img
                  src={images.videoPlayerIcon}
                  alt="Watch Videos"
                  className="h-10 w-10 sm:h-12 sm:w-12 rotate-6"
                />
              </div>
              <div className="space-y-1">
                <p className="text-gray-900 text-lg sm:text-xl lg:text-2xl font-bold mb-1">
                  Watch Videos
                </p>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-500">
                  Earn rewards by watching
                </h3>
              </div>

              <button
                onClick={() => navigate("/app/watch-ads")}
                className="flex items-center text-gray-900 hover:text-green-700 bg-[#dcf2e6] p-2 rounded-full w-fit"
              >
                <ArrowRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            </div>
          </BoxCard>

          <BoxCard
            padding="p-0"
            className="overflow-hidden bg-[#effbf5] min-h-[140px] sm:min-h-[160px] lg:h-[30vh]"
          >
            <div className="flex flex-col justify-between space-y-3 sm:space-y-5 p-4 h-full">
              <div className="bg-green-200 p-[3px] w-fit rounded-xl">
                <img
                  src={images.walletIcon}
                  alt="Complete Offers"
                  className="h-10 w-10 sm:h-12 sm:w-12"
                />
              </div>
              <div className="space-y-1">
                <p className="text-gray-900 text-lg sm:text-xl lg:text-2xl font-bold mb-1">
                  Withdraw
                </p>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-500">
                  Cash out your earnings
                </h3>
              </div>

              <button
                onClick={() => navigate("/app/withdraw")}
                className="flex items-center text-gray-900 hover:text-green-700 bg-[#dcf2e6] p-2 rounded-full w-fit"
              >
                <ArrowRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            </div>
          </BoxCard>

          <BoxCard
            padding="p-0"
            className="overflow-hidden bg-[#effbf5] min-h-[140px] sm:min-h-[160px] lg:h-[30vh]"
          >
            <div className="flex flex-col justify-between space-y-3 sm:space-y-5 p-4 h-full">
              <div className="bg-[#dbfae2] p-[3px] w-fit rounded-xl">
                <img
                  src={images.profileIcon}
                  alt="Withdraw"
                  className="h-10 w-10 sm:h-12 sm:w-12"
                />
              </div>
              <div className="space-y-1">
                <p className="text-gray-900 text-lg sm:text-xl lg:text-2xl font-bold mb-1">
                  Complete Profile
                </p>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-500">
                  Finish setting up your account
                </h3>
              </div>

              <button
                onClick={() => navigate("/app/profile")}
                className="flex items-center text-gray-900 hover:text-green-700 bg-[#dcf2e6] p-2 rounded-full w-fit"
              >
                <ArrowRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            </div>
          </BoxCard>

          <BoxCard
            padding="p-0"
            className="overflow-hidden bg-[#effbf5] min-h-[140px] sm:min-h-[160px] lg:h-[30vh]"
          >
            <div className="flex flex-col justify-between space-y-3 sm:space-y-5 p-4 h-full">
              <div className="bg-[#dbfae2] p-[3px] w-fit rounded-xl">
                <img
                  src={images.referrerPeopleicon}
                  alt="Refer Friends"
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                />
              </div>
              <div className="space-y-1">
                <p className="text-gray-900 text-lg sm:text-xl lg:text-2xl font-bold mb-1">
                  Refer Friends
                </p>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-500">
                  Earn from referrals
                </h3>
              </div>

              <button
                onClick={() => navigate("/app/referrer")}
                className="flex items-center text-gray-900 hover:text-green-700 bg-[#dcf2e6] p-2 rounded-full w-fit"
              >
                <ArrowRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            </div>
          </BoxCard>
        </div>
      </div>

       {/* Mobile Quick Actions */}
      <div className="sm:hidden flex flex-col">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Quick Actions
          </h3>
          <button className="text-green-600 text-sm font-medium hover:text-green-700 flex items-center gap-1">
            View All <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => navigate("/app/watch-ads")}
            className="text-left"
          >
            <BoxCard
              padding="p-2"
              className="overflow-hidden bg-[#effbf5] flex justify-center items-center space-x-3"
            >
              <div className="bg-green-200 p-[3px] w-fit h-fit rounded-lg">
                <img
                  src={images.videoPlayerIcon}
                  alt="Watch Videos"
                  className="h-6 w-6 rotate-6"
                />
              </div>

              <div>
                <p className="text-gray-900 text-sm font-bold mb-1">
                  Watch Videos
                </p>
                <h3 className="text-[10px] font-semibold text-gray-500">
                  Earn rewards by watching
                </h3>
              </div>
            </BoxCard>
          </button>

          <button
            type="button"
            onClick={() => navigate("/app/withdraw")}
            className="text-left"
          >
            <BoxCard
              padding="p-2"
              className="overflow-hidden bg-[#effbf5] flex justify-center items-center space-x-3"
            >
              <div className="bg-green-200 p-[3px] w-fit h-fit rounded-lg">
                <img
                  src={images.walletIcon}
                  alt="Wallet"
                  className="h-6 w-6"
                />
              </div>

              <div>
                <p className="text-gray-900 text-sm font-bold mb-1">
                  Withdraw
                </p>
                <h3 className="text-[10px] font-semibold text-gray-500">
                  Cash out your earnings
                </h3>
              </div>
            </BoxCard>
          </button>

          <button
            type="button"
            onClick={() => navigate("/app/profile")}
            className="text-left"
          >
            <BoxCard
              padding="p-2"
              className="overflow-hidden bg-[#effbf5] flex justify-center items-center space-x-3"
            >
              <div className="bg-green-200 p-[3px] w-fit h-fit rounded-lg">
                <img
                  src={images.profileIcon}
                  alt="Profile"
                  className="h-6 w-6"
                />
              </div>

              <div>
                <p className="text-gray-900 text-sm font-bold mb-1">
                  Complete Profile
                </p>
                <h3 className="text-[10px] font-semibold text-gray-500">
                   Finish setting up your account
                </h3>
              </div>
            </BoxCard>
          </button>

          <button
            type="button"
            onClick={() => navigate("/app/referrer")}
            className="text-left"
          >
            <BoxCard
              padding="p-2"
              className="overflow-hidden bg-[#effbf5] flex justify-center items-center space-x-3"
            >
              <div className="bg-green-200 p-[3px] w-fit h-fit rounded-lg">
                <img
                  src={images.referrerPeopleicon}
                  alt="Refer Friends"
                  className="h-7 w-7 object-contain"
                />
              </div>

              <div>
                <p className="text-gray-900 text-sm font-bold mb-1">
                   Refer Friends
                </p>
                <h3 className="text-[10px] font-semibold text-gray-500">
                  Earn rewards by referring friends
                </h3>
              </div>
            </BoxCard>
          </button>
        </div>
      </div>

      {/* Referral Section */}
      <BoxCard className=" bg-[#dff7e7] border-2 border-green-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <img src={images.referrerGiftIcon} alt="" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Invite Friends & Earn More!
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Share your referral link and earn bonus when your friends join.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap">
            <Copy className="h-5 w-5" />
            Copy Referral Link
          </button>
        </div>
      </BoxCard>
    </div>
  );
}
