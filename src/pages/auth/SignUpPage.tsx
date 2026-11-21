import { useNavigate } from "react-router-dom";
import { images } from "@/constants/images";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, User } from "lucide-react";
import AuthLeft from "@/components/reusable/authLeft";
import FormInput from "@/components/reusable/FormInput";
import GoogleSignInButton from "@/components/reusable/GoogleSignInButton";
import { useRegister } from "@/hooks/auth/use-auth";

const signUpSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await registerMutation.mutateAsync(data);
      navigate("/verify", { state: { email: data.email } });
    } catch {
      // Error is surfaced via registerMutation.error below
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
              Create Account
            </h1>
            <p className="text-gray-600">Start earning by watching ads</p>
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
            {registerMutation.isError && (
              <p className="text-sm text-red-600 text-center">
                {registerMutation.error.message}
              </p>
            )}
            {/* Display Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FormInput
                label="Display Name"
                icon={User}
                placeholder="Your name"
                type="text"
                id="displayName"
                required
                error={errors.displayName?.message}
                register={register("displayName")}
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
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
              transition={{ delay: 0.4 }}
            >
              <FormInput
                label="Password"
                icon={Lock}
                placeholder="••••••••"
                type="password"
                id="password"
                required
                error={errors.password?.message}
                register={register("password")}
              />
            </motion.div>

            {/* Sign Up Button */}
            <motion.button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {registerMutation.isPending ? "Creating account..." : "Sign Up"}
            </motion.button>
          </form>

         

          {/* Sign In Link */}
          <motion.p
            className="text-center mt-6 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Sign In
            </button>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
