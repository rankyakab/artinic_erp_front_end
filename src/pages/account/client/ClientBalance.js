import React, { useEffect } from 'react';
import { ArrowUpward } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { Action, HeadCard, ProcurementCard, Wrapper } from '../../../styles/main';
import { getAllBalances } from '../../../redux/actions/ClientBalanceAction';

function ClientBalance() {
  const navigate = useNavigate();
  const tableHead = ['S/N', 'Client Name', 'Total Amount (₦‎)', 'initialPayment(₦‎)', 'Balance (₦‎)', 'Action'];

  const dispatch = useDispatch();

  const { allClientBalance, loading } = useSelector((state) => state?.clientBalance);

  useEffect(() => {
    dispatch(getAllBalances());
  }, []);

  return (
    <>
      <Helmet>
        <title> Client Balance | Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={`Client Balance`} text={`View all client balance`} />

        <Grid item xs={12} md={12}>
          <ProcurementCard sx={{ height: 'auto', padding: '1rem 2rem' }}>
            <Typography sx={{ fontWeight: '800', fontSize: 28 }}>
              {allClientBalance?.totalBalance === null ||
              allClientBalance?.totalBalance === 'undefined' ||
              allClientBalance?.totalBalance === ''
                ? 0
                : allClientBalance?.totalBalance}
            </Typography>

            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>Total Balance</Typography>
          </ProcurementCard>
        </Grid>

        <HeadCard sx={{ width: '100%', mt: '16px' }}>
          <Stack sx={{ width: '100%' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>All Balance</Typography>

            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: '2rem',
                }}
              >
                <CircularProgress
                  sx={{
                    width: '25px',
                  }}
                />
              </Box>
            ) : allClientBalance?.clientbalances?.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: '2rem',
                }}
              >
                <p>No Balance</p>
              </Box>
            ) : (
              <TableContainer sx={{ maxHeight: '550px', width: '100%' }} className="memo-table_paper">
                <Table>
                  <TableHead>
                    <TableRow>
                      {tableHead.map((td, key) => (
                        <TableCell
                          key={key}
                          style={{
                            minWidth: 80,
                            fontWeight: 800,
                            fontSize: '12px',
                            lineHeight: '16px',
                            // color: '#515151',
                          }}
                        >
                          {td}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allClientBalance?.clientbalances?.map((data, key) => (
                      <TableRow key={key}>
                        <TableCell
                          style={{
                            minWidth: 80,
                          }}
                        >
                          {key + 1}
                        </TableCell>
                        <TableCell
                          style={{
                            minWidth: 80,
                          }}
                        >
                          {data?.projectName}
                        </TableCell>
                        <TableCell
                          style={{
                            minWidth: 80,
                          }}
                        >
                          {data?.projectCost}
                        </TableCell>

                        <TableCell
                          style={{
                            minWidth: 80,
                          }}
                        >
                          {data?.clientPayments}
                        </TableCell>

                        <TableCell
                          style={{
                            minWidth: 80,
                          }}
                        >
                          {data?.paymentsBalances}
                        </TableCell>

                        <TableCell
                          style={{
                            minWidth: 80,
                          }}
                          onClick={() => {
                            navigate(`/dashboard/client-balance-details/${data?._id}`);
                          }}
                        >
                          <Action>View More</Action>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Stack>
        </HeadCard>
      </Wrapper>
    </>
  );
}

export default ClientBalance;
