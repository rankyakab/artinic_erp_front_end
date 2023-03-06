import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title, GeneralInput, InputLabel, OutlinedButton } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
import { createTraining } from '../../../redux/actions/TrainingAction';

const TrainingRequest = () => {
  const navigate = useNavigate();

  const [trainingData, setTrainingData] = useState({
    trainingDescription: 'For the old',
    startDate: '2022-11-27T21:23:07.639Z',
    trainingType: 'physical ',
    duration: 30,
    trainingMode: 'Content deep track',
    status: 'To-do',
    sentTo: [
      {
        recipientId: '6388e839f6dfb5ea10eddab4',
        ccLevel: 1,
        action: '',
        remarks: '',
      },
      {
        recipientId: '6388e839f6dfb5ea10eddab4',
        ccLevel: 2,
        action: '',
        remarks: '',
      },
    ],
  });

  const handleFormChange = ({ name, value }) => {
    setTrainingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleCreateTraining = (e) => {
    e.preventDefault();
    dispatch(createTraining(setTrainingData));
  };

  return (
    <>
      <Helmet>Training Request | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Training Request'} text={'Create and submit request for staff training'} />

        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              navigate('/dashboard/capacity_building');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <FormCard onClick={handleCreateTraining}>
          <Title>Training Request</Title>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Training description</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Descriptions"
                  value={trainingData?.trainingDescription}
                  onChange={(e) => handleFormChange(e.target)}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Training type</InputLabel>
                <GeneralInput
                  select
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="">Option 1</option>
                  <option value="">Option 2</option>
                </GeneralInput>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Training duration</InputLabel>
                <GeneralInput
                  select
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select Option</option>
                  <option value="">Option 1</option>
                  <option value="">Option 2</option>
                </GeneralInput>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Training date</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  placeholder="DD/MM/YYYY"
                  value={trainingData?.startDate}
                  onChange={(e) => handleFormChange(e.target)}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Training mode</InputLabel>
                <GeneralInput
                  select
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select mode</option>
                  <option value="">Option 1</option>
                  <option value="">Option 2</option>
                </GeneralInput>
              </Stack>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '30%', mt: 2, mb: 3 }}>
            <Button>Save and Submit</Button>
            <OutlinedButton>Save</OutlinedButton>
          </Box>
        </FormCard>
      </Wrapper>
    </>
  );
};

export default TrainingRequest;
