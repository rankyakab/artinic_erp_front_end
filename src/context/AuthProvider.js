import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const AuthContext = createContext({});
 AuthProvider.propTypes = {
    children: PropTypes.node
  };
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
