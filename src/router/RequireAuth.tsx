import { Navigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useAuth } from "@/hooks/auth/use-auth";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isError } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <PropagateLoader color="#16A34A" />
      </div>
    );
  }

  if (isError || !data?.user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
