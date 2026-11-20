import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "@/pages/auth/WelcomePage";
import SignUpPage from "@/pages/auth/SignUpPage";
import SignInPage from "@/pages/auth/SignInPage";
import SignOutPage from "@/pages/auth/SignOutPage";
import VerificationPage from "@/pages/auth/VerificationPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import WithdrawPage from "@/pages/dashboard/WithdrawPage";
import ProfilePage from "@/pages/dashboard/ProfilePage";
import ReferrerPage from "@/pages/dashboard/ReferrerPage";
import WatchAdsPage from "@/pages/dashboard/WatchAdsPage";
import RequireAuth from "@/router/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signout",
    element: <SignOutPage />,
  },
  {
    path: "/verify",
    element: <VerificationPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/app",
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "withdraw",
        element: <WithdrawPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "referrer",
        element: <ReferrerPage />,
      },
      {
        path: "watch-ads",
        element: <WatchAdsPage />,
      },
    ],
  },
]);
