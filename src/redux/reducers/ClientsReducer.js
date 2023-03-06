import * as ClientsTypes from '../types/ClientsTypes';

const initialState = {
  loading: false,
  api_error: '',
  clients: [],
  create: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ClientsTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ClientsTypes?.GET_ALL__CLIENTS:
      console.log(action.payload, 'from the store');
      return {
        ...state,
        clients: action.payload,
      };
    case ClientsTypes?.CREATE_CLIENTS:
      return {
        ...state,
        create: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
