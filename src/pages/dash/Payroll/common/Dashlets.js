import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Stack } from '@mui/material';
import { Card } from '../../../../styles/main';

export const Dashlets = ({ text, img, number, per }) => {
  Dashlets.propTypes = {
    text: PropTypes.string,
    img: PropTypes.object,
    number: PropTypes.string,
    per: PropTypes.string,
  };
  return (
    <>
      <Card>
        <Stack>
          <div>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>{number}</Typography>
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>{text}</Typography>
          </div>
          <div style={{ paddingTop: '1.5rem' }}>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{per}</Typography>
          </div>
        </Stack>
        <img src={img} alt="img" />
      </Card>
    </>
  );
};
