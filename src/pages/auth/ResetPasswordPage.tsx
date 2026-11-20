import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { images } from "@/constants/images";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock } from "lucide-react";
import { PropagateLoader } from "react-spinners";
import AuthLeft from "@/components/reusable/authLeft";
import FormInput from "@/components/reusable/FormInput";
import {
  useResetPassword,
  useVerifyResetToken,
} from "@/hooks/auth/use-auth";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const verifyToken = useVerifyResetToken();
  const resetPassword = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Validate the token from the reset link once on mount
  useEffect(() => {
    if (token) {
      verifyToken.mutate({ token });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;
    try {
      await resetPassword.mutateAsync({
        token,
        newPassword: data.newPassword,
      });
      navigate("/signin", { replace: true });
    } catch {
      // Error is surfaced via resetPassword.error below
    }
  };

  const renderContent = () => {
    if (!token || verifyToken.isError || verifyToken.data?.valid === false) {
      return (
        <motion.div
          className="w-full max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:hidden flex justify-center mb-8">
            <img
              src={images.logo}
              alt="EarnBridge Logo"
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Invalid Reset Link
          </h1>
          <p className="text-gray-600 mb-8">
            {verifyToken.error?.message ??
              "This password reset link is invalid or has expired."}
          </p>
          <button
            onClick={() => navigate("/forgot-password")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Request a new link
          </button>
        </motion.div>
      );
    }

    if (verifyToken.isPending || !verifyToken.data?.valid) {
      return (
        <div className="flex flex-col items-center gap-4 py-12">
          <PropagateLoader color="#16A34A" />
          <p className="text-gray-600">Verifying reset link...</p>
        </div>
      );
    }

    return (
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:hidden flex justify-center mb-8">
          <img
            src={images.logo}
            alt="EarnBridge Logo"
            className="h-12 w-auto"
          />
        </div>

        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600">Enter your new password below.</p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {resetPassword.isError && (
            <p className="text-sm text-red-600 text-center">
              {resetPassword.error.message}
            </p>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FormInput
              label="New Password"
              icon={Lock}
              placeholder="••••••••"
              type="password"
              id="newPassword"
              required
              error={errors.newPassword?.message}
              register={register("newPassword")}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <FormInput
              label="Confirm New Password"
              icon={Lock}
              placeholder="••••••••"
              type="password"
              id="confirmPassword"
              required
              error={errors.confirmPassword?.message}
              register={register("confirmPassword")}
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={resetPassword.isPending}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {resetPassword.isPending ? "Resetting..." : "Reset Password"}
          </motion.button>
        </form>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex">
      <AuthLeft />
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        {renderContent()}
      </div>
    </div>
  );
}
