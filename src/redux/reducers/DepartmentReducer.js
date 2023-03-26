import * as DepartmentTypes from '../types/DepartmentTypes';

const initialState = {
  loading: false,
  api_error: '',
  departments: [],
  createDepartment: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DepartmentTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case DepartmentTypes?.GET_ALL_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };

    case DepartmentTypes?.CREATE_DEPARTMENT:
      return {
        ...state,
        createDepartment: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
