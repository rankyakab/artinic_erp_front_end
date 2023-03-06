import * as ProcurementsTypes from '../types/ProcurementsTypes';

const initialState = {
  loading: false,
  api_error: '',
  procurements: [],
  create: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ProcurementsTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ProcurementsTypes?.GET_ALL__PROCUREMENTS:
      console.log(action.payload, 'from the store');
      return {
        ...state,
        procurements: action.payload,
      };
    case ProcurementsTypes?.CREATE_PROCUREMENTS:
      return {
        ...state,
        create: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
