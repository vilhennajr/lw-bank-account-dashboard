import {
  DEPOSIT_REQUEST, DEPOSIT_SUCCESS, DEPOSIT_FAILURE,
  WITHDRAW_REQUEST, WITHDRAW_SUCCESS, WITHDRAW_FAILURE,
  TRANSFER_REQUEST, TRANSFER_SUCCESS, TRANSFER_FAILURE,
  FETCH_BALANCE_REQUEST, FETCH_BALANCE_SUCCESS, FETCH_BALANCE_FAILURE
} from '@/store/actions/balanceActions';

const initialState = {
  balance: 0,
  accountId: null,
  loading: false,
  error: null,
};

const balanceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DEPOSIT_REQUEST:
    case WITHDRAW_REQUEST:
    case TRANSFER_REQUEST:
    case FETCH_BALANCE_REQUEST:
      return { ...state, loading: true, error: null };
    
    case DEPOSIT_SUCCESS:
      return {
        ...state,
        loading: false,
        balance: state.balance + action.payload.amount,
      };

      case WITHDRAW_SUCCESS:
      return {
        ...state,
        loading: false,
        balance: state.balance - action.payload.amount,
      };

      case TRANSFER_SUCCESS:
      return {
        ...state,
        loading: false,
        balance: state.balance - action.payload.amount, 
      };
    
    
    case FETCH_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        balance: parseFloat(action.payload.balance),
        accountId: action.payload.id ?? null,
      };
    
    case DEPOSIT_FAILURE:
    case WITHDRAW_FAILURE:
    case TRANSFER_FAILURE:
    case FETCH_BALANCE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default balanceReducer;
