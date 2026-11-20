import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { images } from "@/constants/images";
import { useLogout } from "@/hooks/auth/use-auth";

export default function SignOutPage() {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleSignOut = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => navigate("/signin", { replace: true }),
    });
  };

  const handleCancel = () => {
    // Navigate back to home page
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 relative overflow-hidden">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <img
              src={images.logo}
              alt="EarnBridge Logo"
              className="h-12 w-auto"
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left side - Illustration */}
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                {/* Main Gift Box */}
                <img
                  src={images.giftBox}
                  alt="Gift Box"
                  className="w-48 h-48 lg:w-64 lg:h-64 object-contain mx-auto"
                />

                {/* Floating Trophy */}
                <motion.img
                  src={images.trophy}
                  alt="Trophy"
                  className="absolute top-4 left-4 w-16 h-16 lg:w-20 lg:h-20 object-contain"
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: [-8, 8, -8], opacity: 1 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                />

                {/* Floating Wallet */}
                <motion.img
                  src={images.wallet}
                  alt="Wallet"
                  className="absolute bottom-4 right-4 w-20 h-20 lg:w-24 lg:h-24 object-contain"
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: [8, -8, 8], opacity: 1 }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              className="flex-1 w-full text-center lg:text-left"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Desktop Logo */}
              <div className="hidden lg:block mb-8">
                <img
                  src={images.logo}
                  alt="EarnBridge Logo"
                  className="h-12 w-auto"
                />
              </div>

              {/* Checkmark Icon */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Sign out of EarnBridge?
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                You'll be logged out of your account. Your rewards and progress
                will be saved for when you return.
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={handleSignOut}
                  disabled={logoutMutation.isPending}
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {logoutMutation.isPending ? "Logging out..." : "Log out"}
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full sm:w-auto bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
