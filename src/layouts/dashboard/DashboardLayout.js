import { useState ,useEffect} from 'react';
import {Navigate,useNavigate, Outlet } from 'react-router-dom';

import {useSelector } from 'react-redux';
// @mui
import { Box } from '@mui/material';


import useResponsive from '../../hooks/useResponsive';
// components
import { useSettingsContext } from '../../components/settings';
//

 import {useAuthContext} from '../../auth/useAuthContext';

import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import NavHorizontal from './nav/NavHorizontal';


// ----------------------------------------------------------------------

export default function DashboardLayout() {
    const navigate = useNavigate();
  const {state} = useAuthContext();
  if(state.isAuthenticated) console.log("its authenticatedssssssss")
 // const { auth } = useAuth();
    const { loggedIn } = useSelector((state) => state.auth);
  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

 const checkLoggedIn = (status)=>{

    if(!status){
      navigate('/login');
    }
   }
/*
  const handleOpen = () => {
    setOpen(true);
  };
*/
  const handleClose = () => {
    setOpen(false);
  };
 const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      checkLoggedIn(true);
      setIsLoggedIn(true);
    }else{
      checkLoggedIn(false);
    }

  }, []);






  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;

  if (isNavHorizontal) {
    return (
      <>
        {/* <Header onOpenNav={handleOpen} /> */}
        {/* <DashboardHeader /> */}

        {isDesktop ? <NavHorizontal /> : renderNavVertical}

        <Box sx={{ py: 3, backgroundColor: '#F8F9FD', width: '100%' }}>
          
          <Outlet /> 
 
        </Box>
      </>
    );
  }

  if (isNavMini) {
    return (
      <>
        {/* <Header onOpenNav={handleOpen} /> */}

        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
          }}
        >
          {isDesktop ? <NavMini /> : renderNavVertical}

          <Box sx={{ py: 3, backgroundColor: '#F8F9FD', width: '100%' }}>
          
          <Outlet /> 

          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
        }}
      >
        {renderNavVertical}

        <Box sx={{ py: 3, backgroundColor: '#F8F9FD', width: '100%' }}>
  
          <Outlet /> 
  
        </Box>
      </Box>
    </>
  );
}
