import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, User, Mail, Lock, AlertTriangle, Building2, Plus, CheckCircle, Trash2, LogOut } from "lucide-react";
import BoxCard from "@/components/reusable/BoxCard";
import { images } from "@/constants/images";
import { useBankAccounts } from "@/hooks/useBankAccounts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AddBankFormData } from "@/types/withdrawal";
import { useAppSelector } from "@/store/hooks";
import { PropagateLoader } from "react-spinners";

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

const addBankSchema = z.object({
  accountNumber: z.string().min(10, "Account number must be at least 10 digits").max(11, "Account number must be at most 11 digits"),
  bankName: z.string().min(1, "Bank name is required"),
});

export default function ProfilePage() {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const profile = useAppSelector((state) => state.user.profile);

  const {
    accounts,
    isLoading: accountsLoading,
    addAccount,
    removeAccount,
  } = useBankAccounts();

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

  const {
    register: registerAddBank,
    handleSubmit: handleSubmitAddBank,
    formState: { errors: addBankErrors, isSubmitting: isAddingBank },
    reset: resetAddBank,
  } = useForm<AddBankFormData>({
    resolver: zodResolver(addBankSchema),
    defaultValues: {
      accountNumber: "",
      bankName: "",
    },
  });

  const onProfileSubmit = async (data: ProfileFormData) => {
    console.log("Profile update:", data);
    // TODO: Call API to update profile
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    console.log("Password change:", data);
    // TODO: Call API to change password
    resetPassword();
  };

  const onAddBankSubmit = async (data: AddBankFormData) => {
    try {
      await addAccount(data);
      resetAddBank();
      setShowAddBankModal(false);
    } catch (error) {
      console.error("Failed to add bank account:", error);
    }
  };

  const handleRemoveAccount = async (accountId: string) => {
    try {
      await removeAccount(accountId);
    } catch (error) {
      console.error("Failed to remove bank account:", error);
    }
  };

  const handleDeleteAccount = () => {
    console.log("Delete account");
    // TODO: Call API to delete account
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

      {/* Your Bank Accounts */}
      <BoxCard className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Your Bank Accounts</h3>
          <button
            onClick={() => setShowAddBankModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Bank Account
          </button>
        </div>

        {accountsLoading ? (
          <div className="flex justify-center py-4">
            <PropagateLoader color="#16A34A" size={12} />
            <span className="sr-only">Loading bank accounts...</span>
          </div>
        ) : accounts && accounts.length > 0 ? (
          <div className="space-y-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Building2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900">{account.bankName}</p>
                      {account.isVerified && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      **** {account.accountNumber.slice(-4)}
                    </p>
                    {account.accountName && (
                      <p className="text-xs text-gray-400">{account.accountName}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveAccount(account.id)}
                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No bank accounts added yet</p>
            <p className="text-sm text-gray-400">Add a bank account to withdraw your earnings</p>
          </div>
        )}
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

        <button
          type="button"
          onClick={handleSubmitPassword(onPasswordSubmit)}
          disabled={isSubmittingPassword}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmittingPassword ? "Updating..." : "Update Password"}
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
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
          >
            Delete Account
          </button>
        </div>

        {showDeleteConfirm && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Yes, Delete
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

      {/* Add Bank Account Modal */}
      <Dialog open={showAddBankModal} onOpenChange={setShowAddBankModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Bank Account</DialogTitle>
            <DialogDescription>
              Add your bank account details to withdraw your earnings.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAddBank(onAddBankSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                placeholder="e.g., Access Bank, GTBank"
                {...registerAddBank("bankName")}
              />
              {addBankErrors.bankName && (
                <p className="text-red-500 text-sm">{addBankErrors.bankName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="Enter your 10 or 11 digit account number"
                {...registerAddBank("accountNumber")}
              />
              {addBankErrors.accountNumber && (
                <p className="text-red-500 text-sm">{addBankErrors.accountNumber.message}</p>
              )}
            </div>

            <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowAddBankModal(false);
                  resetAddBank();
                }}
                className="flex-1 sm:flex-none bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isAddingBank}
                className="flex-1 sm:flex-none bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingBank ? "Verifying..." : "Add & Verify"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
