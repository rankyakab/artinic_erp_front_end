import * as LogisticsTypes from '../types/LogisticsTypes';

const initialState = {
  loading: false,
  api_error: '',
  logistics: [],
  create: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LogisticsTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LogisticsTypes?.GET_ALL__LOGISTICS:
      return {
        ...state,
        logistics: action.payload,
      };
    case LogisticsTypes?.CREATE_LOGISTICS:
      return {
        ...state,
        create: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
