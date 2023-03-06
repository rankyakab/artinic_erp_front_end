import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { Dashlets } from '../../components/dashlets';
import DashboardHeader from '../../layouts/dashboard/DashboardHeader';
import { ProcurementCard, Wrapper } from '../../styles/main';
import Applications from '../../assets/images/applications.svg';
import ExpensesStats from './Accounts/common/ExpensesStats';
import { ExpensesHistoryYears } from './Accounts/common/ExpensesHistoryTable';
import ExpensesChart from './Accounts/common/ExpensesChart';
import { getAllExpenditures } from '../../redux/actions/ExpensesAction';
import { getAllVoucher } from '../../redux/actions/VoucherAction';

function Expenses() {
  const dispatch = useDispatch();

  const { expenditures, loading } = useSelector((state) => state?.expenses);

  const { vouchers } = useSelector((state) => state?.voucher);

  useEffect(() => {
    dispatch(getAllExpenditures());
    dispatch(getAllVoucher());
  }, []);

  console.log(expenditures);
  return (
    <>
      <Helmet>
        <title> Expenses | Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={`Expenses`} text={`View all expenses.`} />

        <Grid item xs={12} md={12}>
          <ProcurementCard sx={{ padding: '1rem 2rem' }}>
            <Box>
              <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: '800', fontSize: 28 }}>360,000,000</Typography>
              </Stack>
              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>Total Expenses</Typography>
            </Box>

            <Stack direction="row" alignItems={'center'} spacing={2} sx={{ mt: '1rem' }}>
              <ArrowUpward sx={{ color: '#10A142', width: '15px' }} />{' '}
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>2.5% more than last year</Typography>
            </Stack>
          </ProcurementCard>
        </Grid>

        <Grid item xs={12} sx={{ mt: '2rem' }}>
          <ExpensesStats select={'true'} />
        </Grid>

        <Grid item xs={12} sx={{ mt: '2rem' }}>
          <ExpensesHistoryYears data={vouchers} select={'true'} />
        </Grid>

        <Grid item xs={12} sx={{ mt: '2rem' }}>
          <ExpensesChart select={'true'} />
        </Grid>
      </Wrapper>
    </>
  );
}

export default Expenses;
