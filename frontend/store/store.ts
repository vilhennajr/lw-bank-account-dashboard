import balanceReducer from '@/reducers/balanceReducer';
import { configureStore } from '@reduxjs/toolkit';



export const store = configureStore({
  reducer: {
    balance: balanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
