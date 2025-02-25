import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBalance = createAsyncThunk('balance/fetchBalance', async (accountId: string) => {
  const response = await axios.get(`http://localhost:3001/account/user/${accountId}`);
  return response.data.balance;
});

export const deposit = createAsyncThunk('balance/deposit', async ({ accountId, amount }: { accountId: string, amount: number }) => {
  const response = await axios.post('/api/event', { accountId, amount, type: 'deposit' });
  return response.data.balance;
});

export const withdraw = createAsyncThunk('balance/withdraw', async ({ accountId, amount }: { accountId: string, amount: number }) => {
  const response = await axios.post('/api/event', { accountId, amount, type: 'withdraw' });
  return response.data.balance;
});

export const transfer = createAsyncThunk('balance/transfer', async ({ fromAccountId, toAccountId, amount }: { fromAccountId: string, toAccountId: string, amount: number }) => {
  const response = await axios.post('/api/event', { fromAccountId, toAccountId, amount, type: 'transfer' });
  return response.data.balance;
});

const balanceSlice = createSlice({
  name: 'balance',
   initialState: { balance: 0, loading: false, error: null as string | null, token: '' },
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(deposit.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(withdraw.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(transfer.fulfilled, (state, action) => {
        state.balance = action.payload;
      });
  },
});

export const { setAuthToken } = balanceSlice.actions;
export default balanceSlice.reducer;
