import { images } from "@/constants/images";
import { motion } from "framer-motion";

const AuthLeft = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#f3f3f3] flex-col justify-center relative overflow-hidden">
      {/* Logo Header */}
      <motion.header
        className="absolute top-0 left-0 right-0 px-9 py-4 flex justify-start z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img src={images.logo} alt="EarnBridge Logo" className="h-16 w-auto" />
      </motion.header>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center p-12">
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Mascot/Illustration */}
          <img
            src={images.mascot}
            alt="Rewards Illustration"
            className="w-full h-auto max-w-lg object-contain"
          />

          {/* Floating Gift Card */}
          <motion.img
            src={images.giftBox}
            alt="Gift"
            className="absolute top-20 right-20 w-24 h-24 object-contain"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [-10, 10, -10], opacity: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Floating Wallet */}
          <motion.img
            src={images.wallet}
            alt="Wallet"
            className="absolute bottom-32 left-20 w-28 h-28 object-contain"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [10, -10, 10], opacity: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
          />

          {/* Floating Trophy */}
          <motion.img
            src={images.trophy}
            alt="Trophy"
            className="absolute top-1/3 left-16 w-20 h-20 object-contain"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [-8, 8, -8], opacity: 1 }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.9,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLeft;
