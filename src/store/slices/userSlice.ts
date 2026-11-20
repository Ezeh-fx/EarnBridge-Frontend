import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@/types/auth';

interface UserState {
  userId: string | null;
  hasSeenWelcome: boolean;
  profile: AuthUser | null;
}

const initialState: UserState = {
  userId: null,
  hasSeenWelcome: false,
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setHasSeenWelcome: (state, action: PayloadAction<boolean>) => {
      state.hasSeenWelcome = action.payload;
    },
    setProfile: (state, action: PayloadAction<AuthUser | null>) => {
      state.profile = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const { setUserId, setHasSeenWelcome, setProfile, resetUser } = userSlice.actions;
export default userSlice.reducer;
