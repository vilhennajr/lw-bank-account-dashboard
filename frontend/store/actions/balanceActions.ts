import axios from 'axios';
import { Dispatch } from 'redux';

// Definir tipos para as ações
export const DEPOSIT_REQUEST = 'DEPOSIT_REQUEST';
export const DEPOSIT_SUCCESS = 'DEPOSIT_SUCCESS';
export const DEPOSIT_FAILURE = 'DEPOSIT_FAILURE';

export const WITHDRAW_REQUEST = 'WITHDRAW_REQUEST';
export const WITHDRAW_SUCCESS = 'WITHDRAW_SUCCESS';
export const WITHDRAW_FAILURE = 'WITHDRAW_FAILURE';

export const TRANSFER_REQUEST = 'TRANSFER_REQUEST';
export const TRANSFER_SUCCESS = 'TRANSFER_SUCCESS';
export const TRANSFER_FAILURE = 'TRANSFER_FAILURE';

export const FETCH_BALANCE_REQUEST = 'FETCH_BALANCE_REQUEST';
export const FETCH_BALANCE_SUCCESS = 'FETCH_BALANCE_SUCCESS';
export const FETCH_BALANCE_FAILURE = 'FETCH_BALANCE_FAILURE';


export const fetchBalance = (accountId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_BALANCE_REQUEST });

  try {
    const response = await axios.get(`http://localhost:3001/account/user/${accountId}`);
  
    dispatch({ type: FETCH_BALANCE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BALANCE_FAILURE, error });
  }
};

export const deposit = ({ accountId, type, amount }: { accountId: number, type: string, amount: number }) => 
  async (dispatch: Dispatch) => {
    dispatch({ type: DEPOSIT_REQUEST });

    try {
      const response = await axios.post('http://localhost:3001/event', {
        accountId,
        type,
        amount
      });

      dispatch({ type: DEPOSIT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: DEPOSIT_FAILURE, error });
    }
  };

export const withdraw = ({ accountId, type, amount }: { accountId: number, type: string, amount: number }) => 
  async (dispatch: Dispatch) => {
  dispatch({ type: WITHDRAW_REQUEST });

  try {
    const response = await axios.post('http://localhost:3001/event', { 
        accountId,
        type,
        amount
     });
    dispatch({ type: WITHDRAW_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: WITHDRAW_FAILURE, error });
  }
};

export const transfer =({ accountId, type, amount, targetAccountId }:  { accountId: number, type: string, amount: number, targetAccountId: number }) => 
  async (dispatch: Dispatch) => {
  dispatch({ type: TRANSFER_REQUEST });

  try {
    const response = await axios.post('http://localhost:3001/event', { 
      amount,
      targetAccountId,
      accountId,
      type 
   });
    dispatch({ type: TRANSFER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: TRANSFER_FAILURE, error });
  }
};