import * as RoleTypes from '../types/RoleTypes';

const initialState = {
  loading: false,
  api_error: '',
  roles: [],
  createRole: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RoleTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case RoleTypes?.GET_ALL_ROLES:
      return {
        ...state,
        roles: action.payload,
      };

    case RoleTypes?.CREATE_ROLE:
      return {
        ...state,
        createRole: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
