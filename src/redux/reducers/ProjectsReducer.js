import * as ProjectsTypes from '../types/ProjectsTypes';

const initialState = {
  loading: false,
  api_error: '',
  projects: [],
  create: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ProjectsTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ProjectsTypes?.GET_ALL__PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case ProjectsTypes?.CREATE_PROJECTS:
      return {
        ...state,
        create: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
