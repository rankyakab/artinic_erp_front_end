import * as ActionTypes from '../types/ActionTypes';

const initialState = {
  loading: false,
  api_error: '',
  actions: [],
  createAction: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ActionTypes?.GET_ALL_ACTIONS:
      return {
        ...state,
        actions: action.payload,
      };

    case ActionTypes?.CREATE_ACTION:
      return {
        ...state,
        createAction: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
