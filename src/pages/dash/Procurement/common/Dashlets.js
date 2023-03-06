import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Stack } from '@mui/material';
import { ProcurementCard } from '../../../../styles/main';

export const Dashlets = ({ text, img, number, per }) => {
  Dashlets.propTypes = {
    text: PropTypes.string,
    img: PropTypes.object,
    number: PropTypes.string,
    per: PropTypes.string,
  };
  return (
    <>
      <ProcurementCard>
        <Box>
          <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>{number}</Typography>
            <img src={img} alt="procurements" />
          </Stack>
          <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>{text}</Typography>
        </Box>

        <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 3 }}>{per}</Typography>
      </ProcurementCard>
    </>
  );
};
