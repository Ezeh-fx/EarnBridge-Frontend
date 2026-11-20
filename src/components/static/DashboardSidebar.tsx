import { NavLink } from "react-router-dom";
import { Home, Wallet, User, Gift, LogOut, Play } from "lucide-react";
import { images } from "@/constants/images";

const navItems = [
  { to: "/app", icon: Home, label: "Home" },
  { to: "/app/watch-ads", icon: Play, label: "Watch Ads" },
  { to: "/app/referrer", icon: Gift, label: "Referrer" },
  { to: "/app/withdraw", icon: Wallet, label: "Withdraw" },
  { to: "/app/profile", icon: User, label: "Profile" },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-64 bg-[#1A2C2C] z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-0 flex flex-col
        `}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-x-3">
          <img src={images.logoicon} alt="EarnBridge Icon" className="h-10 w-auto" />
          <h1 className="font-bold text-[25px]">
             <span className="text-white">Earn</span>
             <span className="text-primary">Bridge</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/app"}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t-2 border-white/20"/>

        {/* Log Out */}
        <div className="p-4">
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-colors w-full"
            onClick={() => window.location.href = "/signout"}
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
