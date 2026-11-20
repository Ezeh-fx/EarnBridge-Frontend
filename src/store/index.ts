import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from './slices/userSlice';
import bankAccountsReducer from './slices/bankAccountsSlice';


// Custom storage using localStorage directly
const storage = {
  getItem: (key: string) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, value: string) => {
    return Promise.resolve(localStorage.setItem(key, value));
  },
  removeItem: (key: string) => {
    return Promise.resolve(localStorage.removeItem(key));
  },
};

const rootReducer = combineReducers({
  user: userReducer,
  bankAccounts: bankAccountsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'bankAccounts'], // Persist user slice (hasSeenWelcome, device userId, profile mirror) and bank accounts
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
