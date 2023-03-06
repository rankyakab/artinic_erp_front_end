import React from 'react';
import { Modal, Stack, Typography } from '@mui/material';
import { Button, Card } from '../styles/main';
import errorBadge from '../assets/images/errorIcon.svg';

function ErrorCard({ open, handleClose, message, btnText, handleClick }) {
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
          width: '30%',
        }}
      >
        <Stack spacing={2} alignItems="center" justifyContent={'center'} sx={{ width: '100%' }}>
          <img src={errorBadge} alt="success" />
          <Typography variant="h4" sx={{ color: 'red' }}>
            Error
          </Typography>
          <Typography variant="p">{message}</Typography>

          <Button
            onClick={() => {
              handleClick();
            }}
            type="submit"
            sx={{ width: '100%', marginTop: '3rem' }}
          >
            {btnText}
          </Button>
        </Stack>
      </Card>
    </Modal>
  );
}

export default ErrorCard;
