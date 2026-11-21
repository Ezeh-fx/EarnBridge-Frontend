import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { images } from "@/constants/images";
import { motion } from "framer-motion";
import { PropagateLoader } from "react-spinners";
import { useVerifyOtp } from "@/hooks/auth/use-auth";

interface VerificationLocationState {
  email?: string;
}

export default function VerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as VerificationLocationState | null)?.email;
  const verifyOtp = useVerifyOtp();
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      navigate("/signup", { replace: true });
    }
  }, [email, navigate]);

  const submitCode = (otp: string) => {
    if (!email || verifyOtp.isPending) return;
    verifyOtp.mutate(
      { email, otp },
      {
        onSuccess: () => navigate("/signin", { replace: true }),
      }
    );
  };

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all 6 digits are entered
    if (newCode.every((digit) => digit !== "")) {
      submitCode(newCode.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
      if (newCode.every((digit) => digit !== "")) {
        submitCode(newCode.join(""));
      }
    }
  };

  const handleResend = () => {
    // TODO: Call backend API to resend verification code
    console.log("Resend code");
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={images.logo}
            alt="EarnBridge Logo"
            className="h-16 sm:h-20 w-auto"
          />
        </div>

        {/* Heading */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to{" "}
            <span className="font-semibold text-gray-900">{email}</span>.
            Enter it below to verify your account.
          </p>
        </motion.div>

        {/* Code Input */}
        <motion.div
          className="flex justify-center gap-2 sm:gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={verifyOtp.isPending}
              aria-label={`Digit ${index + 1} of 6`}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white disabled:opacity-50"
            />
          ))}
        </motion.div>

        {verifyOtp.isPending && (
          <div className="flex flex-col items-center gap-4 mb-4">
            <PropagateLoader color="#16A34A" size={14} />
            <p className="text-sm text-gray-600">Verifying...</p>
          </div>
        )}

        {verifyOtp.isError && (
          <p className="text-center text-sm text-red-600 mb-4">
            {verifyOtp.error.message}
          </p>
        )}

        {/* Resend Link */}
        <motion.p
          className="text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            Resend
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}
