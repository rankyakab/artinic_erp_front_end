import * as AuthTypes from '../types/AuthTypes';

// const user = JSON.parse(localStorage.getItem('user'));
// const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : {};
const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : {};

const initialState = {
  loading: false,
  api_error: '',
  loggedIn:'',
  // user: user ? user : {},
  user
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case AuthTypes.LOGIN:
      return {
        ...state,
        loggedIn:true,
       user: {...action.payload},
      };

      
    default:
      return state;
  }
};

export default reducer;
