import * as StocksTypes from '../types/StocksTypes';

const initialState = {
  loading: false,
  api_error: '',
  stocks: [],
  create: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case StocksTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case StocksTypes?.GET_ALL__STOCKS:
      return {
        ...state,
        stocks: action.payload,
      };
    case StocksTypes?.CREATE_STOCKS:
      return {
        ...state,
        create: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
