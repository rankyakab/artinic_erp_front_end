import React, { useEffect, useState } from 'react';
import { Stack, Typography, Box, Grid, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title, GeneralInput, InputLabel, OutlinedButton } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
import { createCircular } from '../../../redux/actions/CircularAction';

const CreateCircular = () => {
  const { loading } = useSelector((state) => state?.memo);

  const [circularData, setCircularData] = useState({
    circularTitle: '',
    sentFrom: '',
    circularMessage: '',
    userGroup: '',
    sentTo: '',
  });

  const handleFormChange = ({ name, value }) => {
    setCircularData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateCircular = (e) => {
    e.preventDefault();
    dispatch(createCircular(circularData));
  };

  return (
    <>
      <Helmet>Create Circulars | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Create Circulars'} text={'Create and send circulars to designated offices.'} />

        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              navigate('/dashboard/circulars');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <FormCard onSubmit={handleCreateCircular}>
          <Title>Create Circular</Title>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="circular_title">Circular title</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="Enter title"
                  name="circularTitle"
                  value={circularData?.circularTitle}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="sent_from">Sent from</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="Otor John"
                  name="sentFrom"
                  value={circularData?.sentFrom}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="sent_to">Sent to</InputLabel>
                <GeneralInput
                  name="sentTo"
                  value={circularData?.sentTo}
                  select
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                  onChange={(e) => handleFormChange(e.target)}
                >
                  <option value="">Select Option</option>
                  <option value="6388e839f6dfb5ea10eddab4">Fatimah</option>
                  <option value="john">John</option>
                </GeneralInput>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Date</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="DD/MM/YYYY"
                  value={circularData?.date}
                  type="date"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Circular message</InputLabel>
                <GeneralInput
                  name="circularMessage"
                  value={circularData?.circularMessage}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="Enter message..."
                />
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button type="submit" sx={{ width: '31.7%' }}>
              Send Circular
            </Button>
          </Grid>
        </FormCard>
      </Wrapper>
    </>
  );
};

export default CreateCircular;
