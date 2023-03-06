import * as MaintenanceTypes from '../types/MaintenanceTypes';

const initialState = {
  loading: false,
  api_error: '',
  maintenance: [],
  create: {},
  assets: [],
  vendors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MaintenanceTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case MaintenanceTypes.GET_ALL_SCHEDULED_MAINTENANCE:
      return {
        ...state,
        maintenance: action.payload,
      };
    case MaintenanceTypes.GET_ALL_ASSET:
      return {
        ...state,
        assets: action.payload,
      };
    case MaintenanceTypes.GET_ALL_VENDORS:
      return {
        ...state,
        vendors: action.payload,
      };
    case MaintenanceTypes.CREATE_MAINTENANCE:
      return {
        ...state,
        create: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
