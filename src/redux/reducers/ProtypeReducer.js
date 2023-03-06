import * as ProtypeTypes from '../types/ProtypeTypes';

const initialState = {
  loading: false,
  api_error: '',
  protype: [],
  create: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ProtypeTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ProtypeTypes?.GET_ALL__PROTYPE:
      console.log(action.payload);
      return {
        ...state,
        protype: action.payload,
      };
    case ProtypeTypes?.CREATE_PROTYPE:
      return {
        ...state,
        create: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
