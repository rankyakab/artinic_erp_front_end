import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import {
  Button,
  Grid,
  Stack,
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  FormLabel,
  Checkbox,
  FormControl,
  CircularProgress,
} from '@mui/material';
import axios from '../../helpers/axios';

// sections
// import Login from '../sections/auth/Login';
// import Login from '../../sections/auth/LoginAuth0';
import ReliaLogo from '../../components/logo';
import Iconify from '../../components/iconify';
import Energy from '../../assets/images/energy.svg';
import {AuthContext} from '../../auth/JwtContext';
import { loginUser } from '../../redux/actions/AuthAction';

const LOGIN_URL = '/auth/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);

 // const dispatch = useDispatch();
   const { loading } = useSelector((state) => state.auth);

  const userRef = useRef();
   const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
 // const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {
    userRef.current.focus();
  }, []);



  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  // rankyakab@gmail.com
  // rankyakab

  const handleSubmit = async (e) => {
   
    e?.preventDefault();
    try {
      const response = await axios.post('/auth/login',
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
             console.log("my response",JSON.stringify(response.data));
             console.log("set auth",JSON.stringify( setAuth));
            
        
        } catch (err) {
           if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }

     /*
    // console.log(user, pwd);

    try {
      dispatch(loginUser({ email, password }, navigate, setEmail, setPassword, setSuccess));
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
    */
  };

  return (
    <Box sx={{ m: 0, p: 0, height: '100vh' }}>
      <Helmet>
        <title> Login | Minimal UI</title>
      </Helmet>

      {/* <Container fixed sx={{ py: 5 }}> */}
      <Grid container spacing={3} sx={{ height: '100vh' }}>
        <Grid item md={6} style={{ padding: '3rem 8rem 0 8rem' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ReliaLogo />
            <Button
              sx={{ border: '1px solid #5584CE', height: 30, py: 3, px: 3, fontWeight: 'light', color: '#5584CE' }}
            >
              Sign Up
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              // alignItems: 'center',
              py: 10,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography>Welcome back!!!</Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Please Sign In</Typography>

            {/* Form */}

            <FormControl sx={{ pt: 3 }}>

             <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
              <Stack sx={{ mt: 2 }}>
                <FormLabel id="email" sx={{ color: 'black', pb: 1 }}>
                  Email address
                </FormLabel>
                <TextField
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  ref={userRef}
                  value={email}
                  placeholder="Email address"
                  required
                />
              </Stack>

              <Stack sx={{ mt: 3 }}>
                <FormLabel id="password" sx={{ color: 'black', pb: 1 }}>
                  Password
                </FormLabel>
                <TextField
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox {...label} />
                  <Typography>Remember me</Typography>
                </div>
                <Typography>I forgot my password</Typography>
              </Box>
              <Stack sx={{ py: 5 }}>
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                  // type="submit"
                  sx={{ color: 'white', background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)', py: 2 }}
                >
                  {loading ? <CircularProgress sx={{ width: '20px', color: '#fff' }} /> : 'Sign In'}
                </Button>
              </Stack>
            </FormControl>
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          style={{ backgroundImage: `url(${Energy})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
        >
          <h1 style={{ color: 'transparent' }}>hi</h1>
        </Grid>
      </Grid>
      {/* </Container> */}

      {/* <Login /> */}
    </Box>
  );
}
