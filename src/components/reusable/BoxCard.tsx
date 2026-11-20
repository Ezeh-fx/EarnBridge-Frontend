import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface BoxCardProps {
  children: ReactNode;
  className?: string;
  padding?: string;
}

export default function BoxCard({ children, className, padding = "p-6" }: BoxCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-200 shadow-sm",
        padding,
        className
      )}
    >
      {children}
    </div>
  );
}
