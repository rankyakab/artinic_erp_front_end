import PropTypes from 'prop-types';
import { createContext,useState, useEffect, useReducer, useCallback } from 'react';
import {useNavigate } from 'react-router-dom';
// utils
import axios from '../utils/axios';
//
import { isValidToken, setSession } from './utils';
import { httpRequest } from '../helpers/index';
// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    console.log("this is context user", action.payload.user)
    return {
      ...state,
      isAuthenticated: true,
       user: action.payload.user,
    };

  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
const [errorMessage, setErrorMessage] = useState("");

/*
  const initialize = useCallback(async () => {
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get('/api/account/my-account');

        const { user } = response.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);
*/
  // LOGIN
  
  const login = async (email, password) => {
    

     
try {
    // Send request to authentication API
    const response = await httpRequest( {
      
      method: 'POST',
     
      data: {
        email,
        password
      },
       url:'/auth/login',
       needToken:false,
      isFormData: false,
      header: false
      
    });

    // Handle response from API
    if (response.status === 200 || response.status === 201) {
      const data = await response.data;
      // Save token to local storage

    localStorage.setItem('token', JSON.stringify(response?.data?.token));
    localStorage.setItem('user', JSON.stringify(response?.data));

    //  localStorage.setItem('authToken', data.token);
    //  localStorage.setItem('user', JSON.stringify(data.user));
      console.log("this is the token being saved to loa=calsto",JSON.parse(localStorage.getItem('user')))
    
     // Redirect to login page
    window.location.href = '/dashboard/one';
    // navigate('/dashboard/one');
    //  console.log("logged in user",data);
      // dispatch({type:"LOGIN",data});
      // Redirect to main page
   //   window.location.href = '/dashboard/one';
    } else {
      console.log("User Authentication failed",response.error)
      const errorData = "User Authentication failed";
      setErrorMessage(errorData);
    }

    } catch (error) {
  console.log("User Authentication failed 3",error);
 // dispatch(setIsLoading(false));
  } finally {
   // dispatch(setIsLoading(false));
   console.log("it didnt happen")
  }
    /*
    console.log(email, password);
    const response = await axios.post('/api/account/login', {
      email,
      password,
    });

    // console.log(response);
    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
    */
  };

  // REGISTER
  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  // LOGOUT
  const logout = () => {
  //  setSession(null);
   // dispatch({
    //  type: 'LOGOUT',
   // });
 
    // Clear token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/login';

  };

  return (
    <AuthContext.Provider
      value={{
        state,
        method: 'jwt',
        login,
        logout,
        register,
        errorMessage,
        dispatch
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
