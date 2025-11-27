import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Export các kiểu dữ liệu để dùng cho TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;