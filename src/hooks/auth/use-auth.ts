import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { persistor } from '@/store';
import { useAppDispatch } from '@/store/hooks';
import { resetUser, setProfile } from '@/store/slices/userSlice';
import type {
  ApiDataEnvelope,
  AuthMeResponse,
  AuthResponse,
  AuthUser,
  ForgotPasswordPayload,
  GoogleAuthPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  ResetTokenStatus,
  VerifyOtpPayload,
  VerifyResetTokenPayload,
} from '@/types/auth';

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterPayload) =>
      api.post<AuthResponse>('/auth/register', data),
  });
}

export function useVerifyOtp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VerifyOtpPayload) =>
      api.post<AuthResponse>('/auth/verify-otp', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginPayload) =>
      api.post<AuthResponse>('/auth/login', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useGoogleLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GoogleAuthPayload) =>
      api.post<ApiDataEnvelope<{ user: AuthUser }>>('/auth/google', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordPayload) =>
      api.post<ApiDataEnvelope<{ message: string }>>(
        '/auth/forgot-password',
        data
      ),
  });
}

export function useVerifyResetToken() {
  return useMutation({
    mutationFn: async (data: VerifyResetTokenPayload) => {
      const res = await api.post<ApiDataEnvelope<ResetTokenStatus>>(
        '/auth/verify-reset-token',
        data
      );
      return res.data;
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordPayload) =>
      api.post<ApiDataEnvelope<{ message: string }>>(
        '/auth/reset-password',
        data
      ),
  });
}

export function useAuth() {
  const dispatch = useAppDispatch();
  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async (): Promise<AuthMeResponse> => {
      const res = await api.get<{
        data?: { user?: AuthUser };
        user?: AuthUser;
      }>('/me');
      const user = res.data?.user ?? res.user;
      if (!user) {
        throw new Error('Not authenticated');
      }
      return { user };
    },
    retry: false,
    staleTime: 60_000,
  });

  // Mirror the server profile into Redux for convenient synchronous reads.
  // TanStack Query remains the source of truth.
  const user = query.data?.user ?? null;
  useEffect(() => {
    dispatch(setProfile(user));
  }, [user, dispatch]);

  return query;
}

export function useLogout() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: () => api.post<AuthResponse>('/auth/logout', {}),
    onError: (error) => {
      console.log('Logout error:', error);
    },
    onSettled: () => {
      queryClient.clear();
      dispatch(resetUser());
      void persistor.purge();
    },
  });
}
