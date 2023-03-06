import { useState } from 'react';
import {Navigate, Outlet } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import { useSettingsContext } from '../../components/settings';
//
// import Main from './Main';
import Header from './header';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import NavHorizontal from './nav/NavHorizontal';
import useAuth from "../../hooks/useAuth";
// import DashboardHeader from './DashboardHeader';

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { auth } = useAuth();
  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;

  if (isNavHorizontal) {
    return (
      <>
        {/* <Header onOpenNav={handleOpen} /> */}
        {/* <DashboardHeader /> */}

        {isDesktop ? <NavHorizontal /> : renderNavVertical}

        <Box sx={{ py: 3, backgroundColor: '#F8F9FD', width: '100%' }}>
          {auth
            ?  <Navigate to="/login"  />
          :<Outlet /> 
  }
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
            {auth
            ?  <Navigate to="/login"  />
          :<Outlet /> 
  }
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
           {auth
            ?  <Navigate to="/login"  />
          :<Outlet /> 
  }
        </Box>
      </Box>
    </>
  );
}
