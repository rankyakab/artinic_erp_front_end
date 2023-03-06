import React from 'react';
import { Stack, Typography, Box, Grid, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title, GeneralInput, InputLabel, OutlinedButton } from '../../../../styles/main';
import Back from '../../../../assets/images/arrow_left.svg';

const CreateReports = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>Create Reports | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Create Reports'} text={'Create project reports'} />

        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              navigate('/dashboard/report');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <FormCard>
          <Stack direction="row" justifyContent="space-between">
            <Title>Fintech Mobile App Development</Title>
            <Button>Download PDF</Button>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '50%', mb: 2 }}>
            <Stack>
              <h4 style={{ marginBottom: '-0.1rem' }}>30,000,000</h4>
              <Typography>Project budget</Typography>
            </Stack>

            <Stack>
              <h4 style={{ marginBottom: '-0.1rem' }}>30,000,000</h4>
              <Typography>Current Expenditure</Typography>
            </Stack>

            <Stack>
              <h4 style={{ marginBottom: '-0.1rem' }}>Ongoing</h4>
              <Typography>Project status</Typography>
            </Stack>
          </Box>
          <Stack>
            <Box>
              <Stack direction="row" alignItems="center" sx={{ marginBottom: '-1rem' }}>
                <h4>Project type: </h4>
                <Typography sx={{ pl: 1 }}>Labour Party</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" sx={{ marginBottom: '-1rem' }}>
                <h4>Project duration: </h4>
                <Typography sx={{ pl: 1 }}>3 months</Typography>
              </Stack>

              <Stack>
                <h4 style={{ marginBottom: '-0.1rem' }}>Asignee: </h4>
                <Typography>Ibrahim Bankole, Fatimah Mohammed, Otor John, Jemz Nweke Jnr.</Typography>
              </Stack>

              <Stack>
                <h4 style={{ marginBottom: '-0.1rem' }}>Description: </h4>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur. Lectus mauris egestas elementum amet tempor diam sed hac nisl.
                  Aliquam. egestas elementum amet tempor diam sed hac nisl. Aliquam.
                </Typography>
              </Stack>
            </Box>
          </Stack>
          {/* <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Circular title</InputLabel>
                <GeneralInput variant="outlined" fullWidth placeholder="Enter title" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Sent from</InputLabel>
                <GeneralInput variant="outlined" fullWidth placeholder="Otor John" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Sent to</InputLabel>
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
                <InputLabel id="last_name">Date</InputLabel>
                <GeneralInput variant="outlined" fullWidth placeholder="DD/MM/YYYY" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="last_name">Circular message</InputLabel>
                <GeneralInput variant="outlined" fullWidth placeholder="Enter message..." />
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button sx={{ width: '31.7%' }}>Send Circular</Button>
          </Grid> */}
        </FormCard>
      </Wrapper>
    </>
  );
};

export default CreateReports;
