import { useNavigate } from "react-router-dom";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  type CredentialResponse,
} from "@react-oauth/google";
import { useGoogleLogin } from "@/hooks/auth/use-auth";
import { PropagateLoader } from "react-spinners";

export default function GoogleSignInButton() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin();

  if (!clientId) {
    return null;
  }

  const handleSuccess = (response: CredentialResponse) => {
    const idToken = response.credential;
    if (!idToken) return;

    googleLogin.mutate(
      { idToken },
      { onSuccess: () => navigate("/app", { replace: true }) }
    );
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="w-full flex flex-col items-center gap-2">
        {googleLogin.isPending ? (
          <PropagateLoader color="#16A34A" />
        ) : (
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Google sign-in failed")}
            theme="outline"
            size="large"
            width="320"
          />
        )}
        {googleLogin.isError && (
          <p className="text-sm text-red-600 text-center">
            {googleLogin.error.message}
          </p>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}
