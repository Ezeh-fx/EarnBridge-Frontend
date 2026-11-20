import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/use-auth";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isError } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (isError || !data?.user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
