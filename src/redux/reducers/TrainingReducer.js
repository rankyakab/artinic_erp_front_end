import * as TrainingTypes from '../types/TrainingTypes';

const initialState = {
  loading: false,
  api_error: '',
  training: [],
  create: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TrainingTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case TrainingTypes?.GET_ALL__TRAINING:
      return {
        ...state,
        training: action.payload,
      };
    case TrainingTypes?.CREATE_TRAINING:
      return {
        ...state,
        create: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
