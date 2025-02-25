import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getBalance = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao obter saldo');
  }
};

export const deposit = async (token: string, amount: number, accountId: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/event`,
      {
        amount,
        accountId,
        type: 'deposit',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Erro ao realizar depósito');
  }
};

export const withdraw = async (token: string, amount: number, accountId: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/event`,
      {
        amount,
        accountId,
        type: 'withdraw',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Erro ao realizar saque');
  }
};

export const transfer = async (
  token: string,
  amount: number,
  sourceAccountId: string,
  destinationAccountId: string
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/event`,
      {
        amount,
        sourceAccountId,
        destinationAccountId,
        type: 'transfer',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Erro ao realizar transferência');
  }
};
