import { NavLink } from "react-router-dom";
import { Home, User, Gift, Play, Wallet } from "lucide-react";

const navItems = [
  { to: "/app", icon: Home, label: "Home" },
  { to: "/app/watch-ads", icon: Play, label: "Watch Ads" },
  { to: "/app/withdraw", icon: Wallet, label: "Wallet" },
  { to: "/app/referrer", icon: Gift, label: "Referrer" },
  { to: "/app/profile", icon: User, label: "Profile" },
];

export default function BottomTab() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/app"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-3 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-gray-500"
              }`
            }
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
