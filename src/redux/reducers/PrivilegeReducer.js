import * as PrivilegeTypes from '../types/PrivilegeTypes';

const initialState = {
  loading: false,
  api_error: '',
  privileges: [],
  privilege: [],
  createPrivilege: {},
  confirm: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PrivilegeTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case PrivilegeTypes?.GET_ALL_PRIVILEGE:
      return {
        ...state,
        privileges: action.payload,
      };

    case PrivilegeTypes?.CREATE_PRIVILEGE:
      return {
        ...state,
        createPrivilege: action.payload,
      };
    case PrivilegeTypes?.GET_ALL_PRIVILEGE_BY_ID:
      return {
        ...state,
        privilege: action.payload,
      };

    case PrivilegeTypes?.CONFIRM_PRIVILEGE:
      return {
        ...state,
        confirm: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
