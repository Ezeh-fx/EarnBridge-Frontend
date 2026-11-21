import BoxCard from "@/components/reusable/BoxCard";
import { images } from "@/constants/images";
import { Play, RefreshCw, Clock, DollarSign } from "lucide-react";
import { formatMoney } from "@/lib/formatMoney";
import { useBalance } from "@/hooks/useBalance";
import { PropagateLoader } from "react-spinners";

export default function WatchAdsPage() {
  const {
    data: balance,
    isLoading: balanceLoading,
    isError: balanceError,
    refetch: refetchBalance,
  } = useBalance();
  const featuredVideo = {
    title: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    reward: 150.00,
    duration: "30 seconds",
    thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=400&fit=crop",
  };

  const moreVideos = [
    { title: "Infinix Note 40", brand: "Infinix", reward: 120.00, duration: "25 seconds" },
    { title: "KFC Special Offer", brand: "KFC", reward: 80.00, duration: "20 seconds" },
    { title: "MTN Data Plans", brand: "MTN", reward: 100.00, duration: "30 seconds" },
    { title: "TECNO Spark 20", brand: "TECNO", reward: 90.00, duration: "25 seconds" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-5 py-5">
      {/* Hero Banner */}
      <BoxCard className="bg-gradient-to-r from-green-600 to-green-400 text-white border-none overflow-hidden min-h-[180px] sm:h-[220px] flex items-center">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 px-4 sm:px-6">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              Watch Ads, Earn Rewards!
            </h1>
            <p className="text-white/90 text-sm sm:text-base mb-4">
              Watch videos and earn money instantly
            </p>
            <button className="bg-white text-green-600 px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Watching
            </button>
          </div>
          <img
            src={images.playGiftEarn}
            alt="Watch and Earn"
            className="w-[180px] sm:w-[250px] h-auto object-contain"
          />
        </div>
      </BoxCard>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <BoxCard padding="p-4" className="bg-[#effbf5]">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-200 p-2 rounded-lg">
              <Play className="h-5 w-5 text-green-700" />
            </div>
            <span className="text-gray-600 text-sm font-medium">Videos Today</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">3/10</p>
        </BoxCard>

        <BoxCard padding="p-4" className="bg-[#effbf5]">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-200 p-2 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-700" />
            </div>
            <span className="text-gray-600 text-sm font-medium">Earned Today</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">—</p>
        </BoxCard>

        <BoxCard padding="p-4" className="bg-[#effbf5]">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-200 p-2 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-700" />
            </div>
            <span className="text-gray-600 text-sm font-medium">Available Balance</span>
          </div>
          {balanceLoading ? (
            <PropagateLoader color="#16A34A" size={16} />
          ) : balanceError ? (
            <div className="flex items-center gap-3">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                Unavailable
              </p>
              <button
                onClick={() => refetchBalance()}
                className="text-green-700 text-sm font-semibold hover:underline"
              >
                Retry
              </button>
            </div>
          ) : (
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {formatMoney(balance?.available ?? 0)}
            </p>
          )}
        </BoxCard>

        <BoxCard padding="p-4" className="bg-[#effbf5]">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-200 p-2 rounded-lg">
              <Clock className="h-5 w-5 text-green-700" />
            </div>
            <span className="text-gray-600 text-sm font-medium">Next Reward In</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">00:02:34</p>
        </BoxCard>
      </div>

      {/* Available Videos Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Available Videos</h2>
          <button className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Featured Video Card */}
        <BoxCard padding="p-0" className="overflow-hidden mb-6">
          <div className="relative">
            <img
              src={featuredVideo.thumbnail}
              alt={featuredVideo.title}
              className="w-full h-[200px] sm:h-[280px] object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button className="bg-white/90 hover:bg-white p-4 rounded-full transition-colors">
                <Play className="h-8 w-8 text-green-600 fill-current" />
              </button>
            </div>
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              {formatMoney(featuredVideo.reward)}
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">{featuredVideo.title}</h3>
                <p className="text-gray-500 text-sm">{featuredVideo.brand}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Clock className="h-4 w-4" />
                <span>{featuredVideo.duration}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Watch for 15 seconds before reward will be given to you</p>
            <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-colors">
              Watch & Earn
            </button>
          </div>
        </BoxCard>

        {/* Next Videos */}
        <BoxCard className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {moreVideos.map((video, index) => (
              <BoxCard key={index} padding="p-0" className="overflow-hidden">
                <div className="relative h-[120px] sm:h-[140px] bg-gray-200">
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Play className="h-8 w-8 text-white fill-current" />
                  </div>
                  <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
                    {formatMoney(video.reward)}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">{video.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{video.brand}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <Clock className="h-3 w-3" />
                    <span>{video.duration}</span>
                  </div>
                  <p className="text-xs text-gray-500">Watch for 15 seconds before reward will be given to you</p>
                </div>
              </BoxCard>
            ))}
          </div>
        </BoxCard>

        {/* How It Works */}
        <BoxCard className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-primary p-2 rounded-lg">
                <Play className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Watch Videos</h4>
                <p className="text-sm text-gray-600">Select and watch sponsored videos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-primary p-2 rounded-lg">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Complete Viewing</h4>
                <p className="text-sm text-gray-600">Watch the video for a 15 second duration</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-primary p-2 rounded-lg">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Get Rewarded</h4>
                <p className="text-sm text-gray-600">Earn money instantly to your wallet</p>
              </div>
            </div>
          </div>
        </BoxCard>
      </div>
    </div>
  );
}
