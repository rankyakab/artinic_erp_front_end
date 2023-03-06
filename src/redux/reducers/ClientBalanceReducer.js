import * as ClientBalanceTypes from '../types/ClientBalanceTypes';

const initialState = {
  loading: false,
  api_error: '',

  allClientBalance: {},
  allClientPayment: {},

  allClientPaymentByClientId: [],
  allClientBalanceByClientId: [],

  allClientPaymentByProjectId: [],
  allClientBalanceByProjectId: [],

  singleClientBalance: [],
  singleClientPayment: [],

  updateClientBalance: {},
  updateClientPayment: {},

  createBalance: {},
  createPayment: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ClientBalanceTypes?.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ClientBalanceTypes?.ALL_CLIENT_BALANCE:
      return {
        ...state,
        allClientBalance: action.payload,
      };
    case ClientBalanceTypes?.ALL_CLIENT_PAYMENT:
      return {
        ...state,
        allClientPayment: action.payload,
      };

    case ClientBalanceTypes?.GET_CLIENT_PAYMENT_BY_CLIENTID:
      return {
        ...state,
        allClientPaymentByClientId: action.payload,
      };
    case ClientBalanceTypes?.GET_CLIENT_BALANCE_BY_CLIENTID:
      return {
        ...state,
        allClientBalanceByClientId: action.payload,
      };

    case ClientBalanceTypes?.GET_CLIENT_PAYMENT_BY_PROJECTID:
      return {
        ...state,
        allClientPaymentByProjectId: action.payload,
      };
    case ClientBalanceTypes?.GET_CLIENT_BALANCE_BY_PROJECTID:
      return {
        ...state,
        allClientBalanceByProjectId: action.payload,
      };

    case ClientBalanceTypes?.GET_SINGLE_CLIENT_BALANCE:
      return {
        ...state,
        singleClientBalance: action.payload,
      };

    case ClientBalanceTypes?.GET_SINGLE_CLIENT_PAYMENT:
      return {
        ...state,
        singleClientPayment: action.payload,
      };

    case ClientBalanceTypes?.CREATE_CLIENT_PAYMENT:
      return {
        ...state,
        createPayment: action.payload,
      };
    case ClientBalanceTypes?.CREATE_CLIENT_BALANCE:
      return {
        ...state,
        createBalance: action.payload,
      };

    case ClientBalanceTypes?.UPDATE_CLIENT_BALANCE:
      return {
        ...state,
        updateClientBalance: action.payload,
      };

    case ClientBalanceTypes?.UPDATE_CLIENT_PAYMENT:
      return {
        ...state,
        updateClientPayment: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
