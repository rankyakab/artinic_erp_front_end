import * as BudgetsTypes from '../types/BudgetsTypes';

const initialState = {
  loading: false,
  api_error: '',
  budgets: [],
  create: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BudgetsTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case BudgetsTypes?.GET_ALL__BUDGETS:
      return {
        ...state,
        budgets: action.payload,
      };
    case BudgetsTypes?.CREATE_BUDGETS:
      return {
        ...state,
        create: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
