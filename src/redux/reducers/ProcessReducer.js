import * as ProcessTypes from '../types/ProcessTypes';

const initialState = {
  loading: false,
  api_error: '',
  processes: [],
  createProcess: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ProcessTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ProcessTypes?.GET_ALL_PROCESS:
      return {
        ...state,
        processes: action.payload,
      };

    case ProcessTypes?.CREATE_PROCESS:
      return {
        ...state,
        createProcess: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
