import React from 'react';
import { Modal, Stack, Typography } from '@mui/material';
import { Button, Card } from '../styles/main';
import successBadge from '../assets/images/successBadge.png';

function SuccessCard({ open, handleClose, message, btnText, handleClick }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        sx={{
          position: 'absolute',
          top: '20%',
          left: '40%',
          transform: 'translate(-60% -60%)',
        }}
      >
        <Stack spacing={2} alignItems="center" justifyContent={'center'} sx={{ width: '100%' }}>
          <img src={successBadge} alt="success" />
          <Typography variant="h4">Congratulations</Typography>
          <Typography variant="p">{message}</Typography>

          <Button
            onClick={() => {
              handleClick();
            }}
            type="submit"
            sx={{ width: '100%' }}
          >
            {btnText}
          </Button>
        </Stack>
      </Card>
    </Modal>
  );
}

export default SuccessCard;
