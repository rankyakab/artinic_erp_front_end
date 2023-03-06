import React from 'react';
import { Grid, Button, TextField, FormLabel, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
// import { useSettingsContext } from '../../../components/settings';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { StaffDetailsTable } from './common/PaySlipTable';
import { Wrapper, FormCard, Title } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';

const GeneratePayroll = () => {
  const navigate = useNavigate();
  // const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Generate Payroll | Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'Payroll'} icon={'eva:dollar-fill'} text={'Generate and send payroll to account.'} />

        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              navigate('/dashboard/payroll');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <FormCard sx={{ mt: 4 }}>
          <Title>Generate Payroll</Title>

          <Grid container sx={{ mt: 5 }}>
            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Payment type
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  select
                  variant="outlined"
                  className="generate-payroll-input"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="">One</option>
                  <option value="">Two </option>
                </TextField>
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Designation
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  select
                  variant="outlined"
                  fullWidth
                  className="generate-payroll-input"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select Designation</option>
                  <option value="">Operations</option>
                  <option value="">Admin</option>
                </TextField>
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Date generated
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  variant="outlined"
                  fullWidth
                  className="generate-payroll-input"
                  placeholder="DD/MM/YYY"
                />
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Gross amount
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  variant="outlined"
                  fullWidth
                  className="generate-payroll-input"
                  placeholder="Enter Amount"
                />
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Tax type
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  select
                  variant="outlined"
                  fullWidth
                  className="generate-payroll-input"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select Tax</option>
                  <option value="">Tax 1</option>
                  <option value="">Tax 2</option>
                </TextField>
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Net amount
                </FormLabel>
                <TextField
                  sx={{ mb: 3, width: '95%' }}
                  variant="outlined"
                  fullWidth
                  className="generate-payroll-input"
                  placeholder="Enter Amount"
                />
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Payment from
                </FormLabel>
                <TextField
                  sx={{ mb: 2, width: '95%' }}
                  variant="outlined"
                  fullWidth
                  className="generate-payroll-input"
                  placeholder="DD/MM/YYY"
                />
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <Stack>
                <FormLabel id="last_name" sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>
                  Payment to
                </FormLabel>
                <TextField
                  sx={{ mb: 2, width: '95%' }}
                  variant="outlined"
                  fullWidth
                  className="generate-payroll-input"
                  placeholder="DD/MM/YYY"
                />
              </Stack>
            </Grid>
          </Grid>
        </FormCard>

        <FormCard>
          <Title>Staff Details</Title>

          <StaffDetailsTable />

          <Button
            sx={{
              color: 'white',
              background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
              py: 1,
              px: 5,
            }}
          >
            Generate Payroll
          </Button>
        </FormCard>
      </Wrapper>
    </>
  );
};

export default GeneratePayroll;
