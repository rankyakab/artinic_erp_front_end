import * as ReceiptsTypes from '../types/ReceiptsType';

const initialState = {
  receipt_Loading: false,
  api_error: '',
  receipts: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ReceiptsTypes?.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ReceiptsTypes?.ALL_RECEIPTS:
      return {
        ...state,
        receipts: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
