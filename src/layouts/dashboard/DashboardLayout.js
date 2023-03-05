import { useState } from 'react';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import { useSettingsContext } from '../../components/settings';
//

import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import NavHorizontal from './nav/NavHorizontal';
// import DashboardHeader from './DashboardHeader';
import RequireAuth from '../../components/RequireAuth';

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

 

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
        
          <RequireAuth />
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
            <RequireAuth />
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
          <p>hello</p>
          <RequireAuth />
        </Box>
      </Box>
    </>
  );
}
