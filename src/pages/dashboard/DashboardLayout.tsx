import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/static/DashboardSidebar";
import DashboardHeader from "@/components/static/DashboardHeader";
import BottomTab from "@/components/static/BottomTab";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <Outlet />
        </main>
        <BottomTab />
      </div>
    </div>
  );
}
