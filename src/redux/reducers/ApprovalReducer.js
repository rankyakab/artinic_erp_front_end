import * as ApprovalTypes from '../types/ApprovalTypes';

const initialState = {
  loading: false,
  api_error: '',
  approvals: [],
  approval: [],
  create: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ApprovalTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ApprovalTypes?.GET_ALL_APPROVALS:
      return {
        ...state,
        approvals: action.payload,
      };
    case ApprovalTypes?.GET_SINGLE_APPROVAL:
      return {
        ...state,
        approval: action.payload,
      };
    case ApprovalTypes?.CREATE_APPROVAL:
      return {
        ...state,
        create: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
