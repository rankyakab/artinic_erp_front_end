import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Stack } from '@mui/material';

export const Dashlets = ({ text, img, number }) => {
  Dashlets.propTypes = {
    text: PropTypes.string,
    img: PropTypes.object,
    number: PropTypes.string,
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'white',
          borderRadius: '20px',
          padding: '1rem',
          height: '150px',
        }}
      >
        <Stack>
          <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>{number}</Typography>
          <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>{text}</Typography>
        </Stack>
        <img src={img} alt="cap_building" />
      </Box>
    </>
  );
};
