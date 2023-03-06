import * as InvoiceTypes from '../types/InvoiceTypes';

const initialState = {
  invoice_Loading: false,
  api_error: '',
  invoices: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case InvoiceTypes?.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case InvoiceTypes?.ALL_INVOICE:
      return {
        ...state,
        invoices: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
