import * as UserTypes from '../types/UserTypes';

const initialState = {
  loading: false,
  api_error: '',
  user: [],
  create: {},
  assign: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UserTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case UserTypes?.GET_ALL__USER:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case UserTypes?.CREATE_USER:
      return {
        ...state,
        create: action.payload,
      };

    case UserTypes?.EDIT_USER:
      return {
        ...state,
        edit: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
