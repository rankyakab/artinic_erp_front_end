import * as VoucherTypes from '../types/VoucherTypes';

const initialState = {
  voucherLoading: false,
  api_error: '',
  vouchers: [],
  createVoucher: {},
  updateVoucher: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case VoucherTypes.LOADING:
      return {
        ...state,
        voucherLoading: action.payload,
      };
    case VoucherTypes.GET_ALL_VOUCHER:
      return {
        ...state,
        vouchers: action.payload,
      };
    case VoucherTypes.CREATE_VOUCHER:
      return {
        ...state,
        createVoucher: action.payload,
      };
    case VoucherTypes?.UPDATE_VOUCHER:
      return {
        ...state,
        updateVoucher: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
