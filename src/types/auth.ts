export interface AuthUser {
  id: string;
  publicId: string;
  email: string;
  displayName: string;
  role: string;
  emailVerified: boolean;
}

export interface RegisterPayload {
  email: string;
  password: string;
  displayName: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user?: AuthUser;
  message?: string;
}

export interface AuthMeResponse {
  user: AuthUser;
}

export interface GoogleAuthPayload {
  idToken: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyResetTokenPayload {
  token: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface ResetTokenStatus {
  valid: boolean;
}

export interface ApiDataEnvelope<T> {
  data: T;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
