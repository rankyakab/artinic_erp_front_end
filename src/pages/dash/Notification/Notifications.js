import React from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title } from '../../../styles/main';
import NotificationCard from './common/NotificationCard';

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>Notifications | Relia Energy</Helmet>

      <Wrapper>
        <DashboardHeader title={'Notifications'} text={'Read and delete notifications.'} />

        <FormCard sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title>Notification</Title>
            <Button
              onClick={() => {
                navigate('/dashboard/opened_notification');
              }}
            >
              Mark All As Read
            </Button>
          </Box>
        </FormCard>

        <FormCard>
          <Title sx={{ fontSize: 12 }}>Today</Title>

          <Grid container sx={{ my: 3 }}>
            <Grid item xs={12} md={12}>
              <NotificationCard />
            </Grid>

            <Grid item xs={12} md={12}>
              <NotificationCard />
            </Grid>

            <Grid item xs={12} md={12}>
              <NotificationCard />
            </Grid>
          </Grid>

          <Title sx={{ fontSize: 12 }}>Yesterday 18th November, 2022</Title>
          <Grid container sx={{ my: 3 }}>
            <Grid item xs={12} md={12}>
              <NotificationCard />
            </Grid>

            <Grid item xs={12} md={12}>
              <NotificationCard />
            </Grid>

            <Grid item xs={12} md={12}>
              <NotificationCard />
            </Grid>
          </Grid>
        </FormCard>
      </Wrapper>
    </>
  );
};

export default Notifications;
