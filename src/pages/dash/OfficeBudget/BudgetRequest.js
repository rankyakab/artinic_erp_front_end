import { Stack, Typography, Box, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title, GeneralInput, InputLabel } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
import { RequestTable } from './common/budgetTable';

const BudgetRequest = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>Budget Request | Relia Energy</Helmet>

      <Wrapper>
        <DashboardHeader title={'Budget Request'} text={'View, create and send budget request.'} />
        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              navigate('/dashboard/office_budget');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <FormCard>
          <Title>Budget Request</Title>
          <p style={{ fontSize: '14px', marginTop: '-0.1rem' }}>Kindly fill in the form below to create a budget</p>

          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Budget number</InputLabel>
                <GeneralInput variant="outlined" fullWidth placeholder="Enter Item" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Budget description</InputLabel>
                <GeneralInput variant="outlined" fullWidth placeholder="Enter description" />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Budget amount</InputLabel>
                <GeneralInput variant="outlined" fullWidth placeholder="Enter Amount " />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Date</InputLabel>
                <GeneralInput variant="outlined" fullWidth placeholder="DD/MM/YYYY" />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Receiving office</InputLabel>
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
          </Grid>
          <Box sx={{ width: '37%', my: 3 }}>
            <Button>Create Budget</Button>
          </Box>
        </FormCard>

        <FormCard>
          <RequestTable />
        </FormCard>
      </Wrapper>
    </>
  );
};

export default BudgetRequest;
