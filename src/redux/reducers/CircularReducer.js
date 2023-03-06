import * as CircularTypes from '../types/CircularTypes';

const initialState = {
  loading: false,
  api_error: '',
  allCircular: [],
  create: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CircularTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CircularTypes.GET_ALL_CIRCULARS:
      return {
        ...state,
        allCircular: action.payload,
      };
    case CircularTypes.CREATE_CIRCULAR:
      return {
        ...state,
        create: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
