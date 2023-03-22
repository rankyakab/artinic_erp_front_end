import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import NotificationsPopover from './header/NotificationsPopover';
import AccountPopover from './header/AccountPopover';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 0, 2, 0),
  // borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

// ----------------------------------------------------------------------

const DashboardHeader = ({ text, title, icon }) => {
  DashboardHeader.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.object,
    title: PropTypes.string,
  };
  return (
    <StyledRoot>
      {/* <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} /> */}

      <Box sx={{ minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon={icon} sx={{ width: 30, height: 30 }} style={{ color: '#14ADD6' }} />
          <Typography variant="subtitle2" noWrap sx={{ fontSize: '30px', color: 'black', fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Box>

        <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
          {text}
        </Typography>
      </Box>

      <Box>
        { // <NotificationsPopover />
        }
        <AccountPopover />
      </Box>
    </StyledRoot>
  );
};

export default DashboardHeader;
