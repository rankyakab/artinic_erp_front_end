import * as ExpensesTypes from '../types/ExpensesTypes';

const initialState = {
  loading: false,
  api_error: '',
  expenditures: [],
  expenditure: [],
  create: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ExpensesTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ExpensesTypes?.ALL_EXPENDITURES:
      return {
        ...state,
        expenditures: action.payload,
      };
    case ExpensesTypes?.GET_SINGLE_EXPENDITURE:
      return {
        ...state,
        expenditure: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
