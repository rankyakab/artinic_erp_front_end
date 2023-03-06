import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Box, Button, FormLabel, Stack, Avatar, Typography } from '@mui/material';
import DashboardHeader from '../../../../layouts/dashboard/DashboardHeader';
import Iconify from '../../../../components/iconify/Iconify';
import { FormCard, Wrapper, GeneralInput } from '../../../../styles/main';
import Back from '../../../../assets/images/arrow_left.svg';
// import { GeneralInput } from '../../../../styles/main';

const UpdateStock = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard/stocks_and_inventory');
  };

  return (
    <>
      <Helmet>
        <title> Update Stocks |Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'Update Stocks'} text={'Add new item to stocks'} />

        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              handleBack();
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <FormCard>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', mb: 5 }}>Add New Item</Typography>

          <Grid container>
            <Grid items xs={12} md={4}>
              <Box
                sx={{
                  border: '0.5px solid #E8E8E8',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 8,
                }}
              >
                <Avatar sx={{ width: 150, height: 150, cursor: 'pointer' }}>
                  <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Iconify icon={'eva:camera-fill'} sx={{ width: 40, height: 40 }} />
                    <p style={{ fontSize: '12px' }}>upload Photo</p>
                  </Stack>
                </Avatar>
                <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 5 }}>
                  <p style={{ fontSize: '12px' }}>Allowed Format</p>
                  <p style={{ fontSize: '14px', marginTop: '-0.5rem' }}>JPG, JPEG, and PNG</p>
                </Stack>
                <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                  <p style={{ fontSize: '12px' }}> Max file size</p>
                  <p style={{ fontSize: '14px', marginTop: '-0.5rem' }}>2MB</p>
                </Stack>
              </Box>
              <Button
                sx={{
                  color: 'white',
                  background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                  width: '100%',
                  py: 1.5,
                  px: 5,
                  mt: 5,
                  mb: 2,
                }}
              >
                Add Item
              </Button>
            </Grid>
            <Grid items xs={12} md={8} sx={{ pl: 5 }}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack>
                    <FormLabel sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>Product name</FormLabel>
                    <GeneralInput fullWidth placeholder="Enter product name" />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack>
                    <FormLabel sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>Product ID</FormLabel>
                    <GeneralInput fullWidth placeholder="Enter ID" />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack>
                    <FormLabel sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>Category</FormLabel>
                    <GeneralInput
                      select
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">Select Category</option>
                      <option value="">Option 1</option>
                      <option value="">Option 2</option>
                    </GeneralInput>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack>
                    <FormLabel sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>QTY purchased</FormLabel>
                    <GeneralInput fullWidth placeholder="Enter quantity" />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack>
                    <FormLabel sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>Unit price</FormLabel>
                    <GeneralInput fullWidth placeholder="Enter amount" />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack>
                    <FormLabel sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>Total amount</FormLabel>
                    <GeneralInput fullWidth placeholder="Amount" />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack>
                    <FormLabel sx={{ width: '100%', color: 'black', pb: 1, fontSize: '14px' }}>Supplier</FormLabel>
                    <GeneralInput fullWidth placeholder="Enter supplier name" />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </FormCard>
      </Wrapper>
    </>
  );
};

export default UpdateStock;
