import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@/hooks/auth/use-auth";
import { PropagateLoader } from "react-spinners";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

export default function GoogleSignInButton() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin();
  const [gisReady, setGisReady] = useState(false);
  const credentialHandler = useRef<(credential?: string) => void>(() => {});

  useEffect(() => {
    credentialHandler.current = (credential?: string) => {
      if (!credential) return;
      googleLogin.mutate(
        { idToken: credential },
        { onSuccess: () => navigate("/app", { replace: true }) }
      );
    };
  });

  useEffect(() => {
    if (!clientId) return;

    const init = () => {
      window.google?.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => credentialHandler.current(response.credential),
      });
      setGisReady(true);
    };

    if (window.google) {
      init();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = init;
    document.head.appendChild(script);
  }, [clientId]);

  if (!clientId) {
    return null;
  }

  const handleClick = () => {
    window.google?.accounts.id.prompt();
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={!gisReady || googleLogin.isPending}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <GoogleIcon />
        Continue with Google
      </button>
      {googleLogin.isPending && (
        <PropagateLoader color="#16A34A" size={14} />
      )}
      {googleLogin.isError && (
        <p className="text-sm text-red-600 text-center">
          {googleLogin.error.message}
        </p>
      )}
    </div>
  );
}
