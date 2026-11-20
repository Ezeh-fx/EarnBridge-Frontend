import { useNavigate } from "react-router-dom";
import { images } from "@/constants/images";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock } from "lucide-react";
import AuthLeft from "@/components/reusable/authLeft";
import FormInput from "@/components/reusable/FormInput";
import GoogleSignInButton from "@/components/reusable/GoogleSignInButton";
import { useLogin } from "@/hooks/auth/use-auth";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      navigate("/app", { replace: true });
    } catch {
      // Error is surfaced via loginMutation.error below
    }
  };


  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Desktop only */}
      <AuthLeft />

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile Logo and Illustration */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <img
              src={images.logo}
              alt="EarnBridge Logo"
              className="h-12 w-auto mb-6"
            />
            <img
              src={images.wallet}
              alt="Wallet Illustration"
              className="w-48 h-48 object-contain"
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
              Welcome Back!
            </h1>
            <p className="text-gray-600">Sign in to your account to continue.</p>
          </motion.div>

          {/* Google Sign In Button */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GoogleSignInButton />
          </motion.div>

          {/* Divider */}
          <motion.div
            className="flex items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {loginMutation.isError && (
              <p className="text-sm text-red-600 text-center">
                {loginMutation.error.message}
              </p>
            )}
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FormInput
                label="Email"
                icon={Mail}
                placeholder="you@example.com"
                type="email"
                id="email"
                required
                error={errors.email?.message}
                register={register("email")}
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <FormInput
                label="Password"
                icon={Lock}
                placeholder="Enter your password"
                type="password"
                id="password"
                required
                error={errors.password?.message}
                register={register("password")}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            </motion.div>

            {/* Log In Button */}
            <motion.button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loginMutation.isPending ? "Logging in..." : "Log in"}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <motion.p
            className="text-center mt-6 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Create Account
            </button>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
