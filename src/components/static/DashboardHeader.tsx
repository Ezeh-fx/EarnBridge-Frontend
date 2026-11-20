import { Menu, Bell, User, Search } from "lucide-react";
import { images } from "@/constants/images";
import { useAppSelector } from "@/store/hooks";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const profile = useAppSelector((state) => state.user.profile);
  const displayName = profile?.displayName || profile?.email || "Account";

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo - Mobile Only */}
        <div className="lg:hidden flex items-center gap-2">
          <img src={images.logoicon} alt="EarnBridge" className="h-8 w-auto" />
          <span className="font-bold text-primary-dark text-lg">
            <span className="text-black">Earn</span>
            <span className="text-primary">Bridge</span>
          </span>
        </div>

        {/* Menu Button - Desktop Only */}
        <button
          onClick={onMenuClick}
          className="hidden  p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>

        {/* Input Field with Search Icon - Desktop Only */}
        <div className="hidden lg:flex items-center gap-2 bg-gray-100 rounded-lg px-5 py-2">
          <Search className="h-5 w-5 text-gray-400" />
          <input type="text" placeholder="Search" className="ml-2 bg-transparent border-none outline-none" />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notification Bell */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </button>

          {/* User Avatar - Desktop Only */}
          <button className="hidden lg:flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-lg text-gray-700 font-semibold">{displayName}</p>
          </button>
        </div>
      </div>
    </header>
  );
}
