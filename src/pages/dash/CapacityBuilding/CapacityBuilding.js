import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title } from '../../../styles/main';
import { Dashlets } from './common/Dashlets';
import TrainingReq from '../../../assets/images/training_request.svg';
import StaffTrained from '../../../assets/images/staff_trained.svg';
import TrainingDone from '../../../assets/images/training_done.svg';
import TrainingRate from '../../../assets/images/training_rate.svg';
import { AllTraining } from './common/capacityTables';
import { getAllTraining } from '../../../redux/actions/TrainingAction';

const CapacityBuilding = () => {
  const navigate = useNavigate();

  const { training, loading } = useSelector((state) => state.training);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTraining());
  }, []);

  console.log(training, 'training');

  return (
    <>
      <Helmet>Capacity Building | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Capacity Building'} text={'Create and submit request for staff training'} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Dashlets number={'350'} text={'Total training request'} img={TrainingReq} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'800'} text={'Total staff trained'} img={TrainingDone} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'300'} text={'Total training done'} img={StaffTrained} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'70%'} text={'Approved request'} img={TrainingRate} />
          </Grid>
        </Grid>

        <FormCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title>Training request</Title>
            <Button
              onClick={() => {
                navigate('/dashboard/training_request');
              }}
            >
              Make Training request
            </Button>
          </Box>
        </FormCard>

        <FormCard>
          <AllTraining training={training} />
        </FormCard>
      </Wrapper>
    </>
  );
};

export default CapacityBuilding;
