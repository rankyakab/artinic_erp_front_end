import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children:PropTypes.any,
  
 
  
};

export default AuthContext;
