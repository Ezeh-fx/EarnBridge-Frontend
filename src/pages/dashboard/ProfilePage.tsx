import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, User, Mail, Lock, AlertTriangle, LogOut } from "lucide-react";
import BoxCard from "@/components/reusable/BoxCard";
import { images } from "@/constants/images";
import { useAppSelector } from "@/store/hooks";
import { useChangePassword, useDeleteAccount } from "@/hooks/auth/use-auth";

const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const profile = useAppSelector((state) => state.user.profile);
  const changePassword = useChangePassword();
  const deleteAccount = useDeleteAccount();
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isSubmittingProfile },
    reset: resetProfile,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  useEffect(() => {
    if (profile) {
      resetProfile({
        fullName: profile.displayName ?? "",
        email: profile.email,
      });
    }
  }, [profile, resetProfile]);

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
    reset: resetPassword,
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = async (data: ProfileFormData) => {
    console.log("Profile update:", data);
    // TODO: Call API to update profile
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setPasswordSuccess(false);
    try {
      await changePassword.mutateAsync({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      resetPassword();
      setPasswordSuccess(true);
    } catch {
      // Error is surfaced via changePassword.error below
    }
  };

  const handleDeleteAccount = () => {
    deleteAccount.mutate(undefined, {
      onSettled: () => navigate("/", { replace: true }),
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-5 py-5">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>

      {/* Profile Header */}
      <BoxCard className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="relative">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
              <img src={images.profileAvatar} alt="Profile" className="h-full w-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {profile?.displayName || "Account"}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              {profile?.email ?? ""}
            </p>
          </div>
        </div>
      </BoxCard>

      {/* Profile Information */}
      <BoxCard className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                {...registerProfile("fullName")}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              />
            </div>
            {profileErrors.fullName && (
              <p className="text-red-500 text-sm mt-1">{profileErrors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                {...registerProfile("email")}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              />
            </div>
            {profileErrors.email && (
              <p className="text-red-500 text-sm mt-1">{profileErrors.email.message}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmitProfile(onProfileSubmit)}
          disabled={isSubmittingProfile}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmittingProfile ? "Saving..." : "Save Changes"}
        </button>
      </BoxCard>

      {/* Change Password */}
      <BoxCard className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                {...registerPassword("currentPassword")}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              />
            </div>
            {passwordErrors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{passwordErrors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                {...registerPassword("newPassword")}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              />
            </div>
            {passwordErrors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{passwordErrors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                {...registerPassword("confirmPassword")}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              />
            </div>
            {passwordErrors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{passwordErrors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {changePassword.isError && (
          <p className="text-sm text-red-600 text-center">
            {changePassword.error.message}
          </p>
        )}
        {passwordSuccess && (
          <p className="text-sm text-green-600 text-center">
            Password updated successfully.
          </p>
        )}
        <button
          type="button"
          onClick={handleSubmitPassword(onPasswordSubmit)}
          disabled={isSubmittingPassword || changePassword.isPending}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmittingPassword || changePassword.isPending
            ? "Updating..."
            : "Update Password"}
        </button>
      </BoxCard>

      {/* Delete Account */}
      <BoxCard className="border-2 border-red-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Delete Account</h3>
            <p className="text-gray-600 text-sm">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
            disabled={deleteAccount.isPending}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete Account
          </button>
        </div>

        {showDeleteConfirm && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            {deleteAccount.isError && (
              <p className="text-sm text-red-600 mb-3">
                {deleteAccount.error.message}
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleteAccount.isPending}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteAccount.isPending}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteAccount.isPending ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        )}
      </BoxCard>

      {/* Log Out - Mobile only (desktop uses the sidebar) */}
      <BoxCard className="lg:hidden">
        <button
          type="button"
          onClick={() => navigate("/signout")}
          className="w-full flex items-center justify-center gap-3 py-3 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </BoxCard>

    </div>
  );
}
