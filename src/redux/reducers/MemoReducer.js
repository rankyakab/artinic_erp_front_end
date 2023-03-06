import * as MemoTypes from '../types/MemoTypes';

const initialState = {
  loading: false,
  api_error: '',
  allMemo: [],
  memo: [],
  updateMemo: {},
  create: {},
  action: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MemoTypes?.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case MemoTypes?.GET_ALL_MEMO:
      return {
        ...state,
        allMemo: action.payload,
      };
    case MemoTypes?.GET_SINGLE_MEMO:
      return {
        ...state,
        memo: action.payload,
      };
    case MemoTypes?.CREATE_MEMO:
      return {
        ...state,
        create: action.payload,
      };
    case MemoTypes?.UPDATE_MEMO:
      return {
        ...state,
        updateMemo: action.payload,
      };
    case MemoTypes?.MEMO_ACTION:
      return {
        ...state,
        action: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
