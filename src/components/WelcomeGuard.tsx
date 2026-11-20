import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUserId, setHasSeenWelcome } from '@/store/slices/userSlice';
import { getOrCreateDeviceId } from '@/lib/deviceId';

export default function WelcomeGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId, hasSeenWelcome } = useAppSelector((state) => state.user);

  useEffect(() => {
    // Get or create device ID
    const deviceId = getOrCreateDeviceId();
    
    // Set user ID in Redux if not already set
    if (!userId) {
      dispatch(setUserId(deviceId));
    }

    // If user has already seen welcome screen, redirect to signup
    if (hasSeenWelcome) {
      navigate('/signup', { replace: true });
    }
  }, [userId, hasSeenWelcome, dispatch, navigate]);

  // Mark welcome as seen when this component mounts
  useEffect(() => {
    if (!hasSeenWelcome) {
      dispatch(setHasSeenWelcome(true));
    }
  }, [hasSeenWelcome, dispatch]);

  return <>{children}</>;
}
