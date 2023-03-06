import { Stack, Typography, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';

const OpenedNotification = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>Notification | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Notification'} text={'Read and delete notifications.'} />

        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              navigate('/dashboard/notifications');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <FormCard sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title>Notifications from HR</Title>
            <Button>Delete All</Button>
          </Box>
        </FormCard>

        <FormCard>
          <Box>
            <Typography sx={{ fontWeight: 600 }}>Friday, Nov 11. 10:00am</Typography>
            <div style={{ background: '#FAFAFA', borderRadius: '20px', padding: '1rem', marginBottom: '1rem' }}>
              <p>
                Lorem ipsum dolor sit amet consectetur. Aliquet nisl laoreet nunc enim dignissim pulvinar ut enim nulla.
                Lorem eget ultrices est tellus enim proin id. nunc enim dignissim pulvinar ut enim nulla. Lorem eget
                ultrices est tellus enim proin id.
              </p>
            </div>

            <div style={{ background: '#FAFAFA', borderRadius: '20px', padding: '1rem', marginBottom: '1rem' }}>
              <p>
                Lorem ipsum dolor sit amet consectetur. Aliquet nisl laoreet nunc enim dignissim pulvinar ut enim nulla.
                Lorem eget ultrices est tellus enim proin id. nunc enim dignissim pulvinar ut enim nulla. Lorem eget
                ultrices est tellus enim proin id.
              </p>
            </div>
          </Box>

          <Box sx={{ mt: 5 }}>
            <Typography sx={{ fontWeight: 600 }}>Saturday, Nov 12. 01:20pm</Typography>
            <div style={{ background: '#FAFAFA', borderRadius: '20px', padding: '1rem', marginBottom: '1rem' }}>
              <p>
                Lorem ipsum dolor sit amet consectetur. Aliquet nisl laoreet nunc enim dignissim pulvinar ut enim nulla.
                Lorem eget ultrices est tellus enim proin id. nunc enim dignissim pulvinar ut enim nulla. Lorem eget
                ultrices est tellus enim proin id.
              </p>
            </div>

            <div style={{ background: '#FAFAFA', borderRadius: '20px', padding: '1rem', marginBottom: '1rem' }}>
              <p>
                Lorem ipsum dolor sit amet consectetur. Aliquet nisl laoreet nunc enim dignissim pulvinar ut enim nulla.
                Lorem eget ultrices est tellus enim proin id. nunc enim dignissim pulvinar ut enim nulla. Lorem eget
                ultrices est tellus enim proin id.
              </p>
            </div>
          </Box>
        </FormCard>
      </Wrapper>
    </>
  );
};

export default OpenedNotification;
