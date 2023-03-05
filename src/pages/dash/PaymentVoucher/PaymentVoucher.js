import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  FormLabel,
  Stack,
  TextField,
  Button,
  FormControl,
  Grid,
  Container,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
// import Iconify from '../../../components/iconify/Iconify';
import { AllPaymentVoucher } from './common/PaymentVoucherTable';
import { Wrapper, HeadCard, FormCard } from '../../../styles/main';
import { getAllVoucher } from '../../../redux/actions/VoucherAction';
import { getAllStaffs } from '../../../redux/actions/StaffAction';

const PaymentVoucher = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { vouchers, voucherLoading } = useSelector((state) => state?.voucher);

  console.log(vouchers);

  useEffect(() => {
    dispatch(getAllVoucher());
    dispatch(getAllStaffs());
  });

  return (
    <>
      <Helmet>
        <title> Payment Voucher | Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader
          title={'Payment Vouchers'}
          text={'View, payment Voucher histories and create payment vouchers'}
        />
        <HeadCard>
          <Grid item md={3} sx={{ display: 'flex', justifyContent: 'center ', alignItems: 'center' }}>
            <Box>
              <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>{vouchers?.length}</Typography>
              <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                Total number of vouchers
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3} sx={{ display: 'flex', justifyContent: 'center ' }}>
            <Stack>
              <FormLabel id="last_name" sx={{ width: '100%', color: 'text.secondary', pb: 0.5, fontSize: '14px' }}>
                Filter Voucher
              </FormLabel>

              <Box sx={{ width: 200 }}>
                <FormControl variant="filled" sx={{ width: '100%' }}>
                  <TextField
                    sx={{
                      background: '#F2F7FF',
                      borderRadius: '10px',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    select
                    variant="outlined"
                    SelectProps={{ native: true }}
                  >
                    <option value="">Filter Voucher </option>
                    <option value="">Memo Voucher</option>
                    <option value="">Procurement Voucher </option>
                  </TextField>
                </FormControl>
              </Box>
            </Stack>
          </Grid>
          <Grid item md={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button
              onClick={() => {
                navigate('/dashboard/create_voucher');
              }}
              sx={{ color: 'white', background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)', py: 1.5, px: 5 }}
            >
              Create New Voucher
            </Button>
          </Grid>
        </HeadCard>

        <FormCard sx={{ width: '100%', overflowY: 'hidden' }}>
          {voucherLoading ? (
            <Container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Container>
          ) : (
            <AllPaymentVoucher vouchers={vouchers} />
          )}
        </FormCard>
      </Wrapper>
    </>
  );
};

export default PaymentVoucher;
