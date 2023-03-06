import * as StaffTypes from '../types/StaffTypes';

const initialState = {
  loading: false,
  api_error: '',
  staffs: [],
  staff: [],
  create: {},
  covertStaff: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case StaffTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case StaffTypes.GET_ALL_STAFF:
      return {
        ...state,
        staffs: action.payload,
      };
    case StaffTypes.GET_SINGLE_STAFF:
      return {
        ...state,
        staff: action.payload,
      };
    case StaffTypes.CREATE_STAFF:
      return {
        ...state,
        create: action.payload,
      };
    case StaffTypes.CONVERT_STAFF_TO_USER:
      return {
        ...state,
        covertStaff: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
