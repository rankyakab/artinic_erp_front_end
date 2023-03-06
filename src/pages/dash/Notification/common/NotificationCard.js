import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, Stack } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

import { FormCard } from '../../../../styles/main';
import Profile from '../../../../assets/images/profile.svg';

const NotificationCard = () => {
  const navigate = useNavigate();

  return (
    <FormCard
      sx={{ my: 1, py: 1, border: '0.5px solid grey', cursor: 'pointer' }}
      onClick={() => {
        navigate('/dashboard/opened_notification');
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex' }}>
          <img src={Profile} alt="profile" />
          <Stack sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: '13px' }}>Your payment invoice request has been approved by Admin</Typography>
            <Typography sx={{ fontSize: '10px' }}>3min ago</Typography>
          </Stack>
        </Box>
        <MoreVert />
      </Box>
    </FormCard>
  );
};

export default NotificationCard;
