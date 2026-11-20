import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "@/constants/images";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUserId, setHasSeenWelcome } from "@/store/slices/userSlice";
import { getOrCreateDeviceId } from "@/lib/deviceId";

export default function WelcomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId, hasSeenWelcome } = useAppSelector((state) => state.user);
  // PersistGate guarantees rehydrated state on first render, so the
  // persisted value is captured once and never changes afterwards.
  const [hasSeenWelcomeAtMount] = useState(hasSeenWelcome);

  useEffect(() => {
    // Get or create device ID
    const deviceId = getOrCreateDeviceId();
    
    // Set user ID in Redux if not already set
    if (!userId) {
      dispatch(setUserId(deviceId));
    }

    // If user has already seen welcome screen, redirect to signup immediately
    if (hasSeenWelcomeAtMount) {
      navigate("/signup", { replace: true });
      return;
    }

    // Mark welcome as seen immediately on first visit
    dispatch(setHasSeenWelcome(true));

    // Redirect after 5 minutes
    const timer = setTimeout(() => {
      navigate("/signup");
    }, 300000); // 5 minutes = 300000ms

    return () => clearTimeout(timer);
  }, [userId, hasSeenWelcomeAtMount, dispatch, navigate]);

  return (
    <div className="h-screen bg-white relative overflow-hidden flex flex-col">
      {/* Top Wave Background */}
      <motion.div
        className="absolute top-0 left-0 right-0 w-full h-24 sm:h-32"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          style={{ fill: "#DCFCE7" }}
        >
          <path d="M0,0L60,10.7C120,21,240,43,360,37.3C480,32,600,0,720,-10.7C840,-21,960,-11,1080,5.3C1200,21,1320,43,1380,53.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
      </motion.div>

      {/* Bottom Wave Background */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 w-full h-20 sm:h-24"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          style={{ fill: "#DCFCE7" }}
        >
          <path d="M0,80L60,85.3C120,91,240,101,360,98.7C480,96,600,80,720,74.7C840,69,960,74,1080,82.7C1200,91,1320,101,1380,106.7L1440,112L1440,150L1380,150C1320,150,1200,150,1080,150C960,150,840,150,720,150C600,150,480,150,360,150C240,150,120,150,60,150L0,150Z" />
        </svg>
      </motion.div>

      {/* Header */}
      <motion.header
        className="px-4 sm:px-6 lg:px-12 py-3 sm:py-4 lg:py-6 relative z-10 flex justify-center lg:justify-start"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src={images.logo}
          alt="EarnBridge Logo"
          className="h-16 sm:h-[75px] lg:h-20 xl:h-24 w-auto"
        />
      </motion.header>

      {/* Main Content - Side by Side */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
          {/* Welcome Text Container */}
          <motion.div
            className="flex-1 text-center lg:text-left lg:pr-8"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl 2xl:text-9xl font-bold text-text-heading mb-2 sm:mb-3 lg:mb-4">
              Welcome to <span className="text-primary">EarnBridge</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text font-semibold">
              Click and Watch to get paid
            </p>
          </motion.div>

          {/* Illustration Container */}
          <motion.div
            className="flex-1 w-full lg:pl-8"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <img
              src={images.mascot}
              alt="Person with mobile phone"
              className="w-full h-auto object-contain max-h-[40vh] sm:max-h-[45vh] md:max-h-[50vh] lg:max-h-[60vh] xl:max-h-[65vh]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
