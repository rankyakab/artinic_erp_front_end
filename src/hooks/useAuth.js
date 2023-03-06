 import { useContext } from "react";
import AuthContext from "../auth/JwtContext";

const useAuth = () => useContext(AuthContext)


export default useAuth;