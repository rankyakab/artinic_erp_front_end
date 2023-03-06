import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
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
import { Dashlets } from '../../../../components/dashlets/index';
import total from '../../../../assets/icons/totalApprovalIcon.png';
import approved from '../../../../assets/icons/approvedApprovalIcon.png';
import pending from '../../../../assets/icons/pendingApprovalIcon.png';
import rejected from '../../../../assets/icons/rejectedApprovalIcon.png';
import DashboardHeader from '../../../../layouts/dashboard/DashboardHeader';
import { Action, Failed, GeneralInput, HeadCard, InputLabel, Pending, Success, Wrapper } from '../../../../styles/main';
import Iconify from '../../../../components/iconify/Iconify';
import { getAllApprovals } from '../../../../redux/actions/ApprovalAction';

function Approvals() {
  const navigate = useNavigate();
  const tableHead = ['S/N', 'Description', 'Request Date', 'Amount (₦‎)', 'Attachment?', 'Status', 'Action'];

  const { approvals } = useSelector((state) => state.approval);

  const dispatch = useDispatch();

  console.log(approvals);

  const tableData = [
    {
      description: 'Invoice for the purchase of office stationaries',
      date: '29/12/2022',
      amount: '700,000.00',
      attachment: 'Yes',
      status: 'Pending',
    },
    {
      description: 'Invoice for the purchase of office stationaries',
      date: '29/12/2022',
      amount: '700,000.00',
      attachment: 'Yes',
      status: 'Pending',
    },
    {
      description: 'Invoice for the purchase of office stationaries',
      date: '29/12/2022',
      amount: '700,000.00',
      attachment: 'Yes',
      status: 'Approved',
    },
    {
      description: 'Invoice for the purchase of office stationaries',
      date: '29/12/2022',
      amount: '700,000.00',
      attachment: 'Yes',
      status: 'Approved',
    },
    {
      description: 'Invoice for the purchase of office stationaries',
      date: '29/12/2022',
      amount: '700,000.00',
      attachment: 'Yes',
      status: 'Rejected',
    },
    {
      description: 'Invoice for the purchase of office stationaries',
      date: '29/12/2022',
      amount: '700,000.00',
      attachment: 'Yes',
      status: 'Pending',
    },
  ];

  useEffect(() => {
    dispatch(getAllApprovals());
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title> Approvals | Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={`Approvals`} text={`View all approval request`} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Dashlets number={'210'} text={'Total approval request'} per={'20 more than last year'} img={total} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'50'} text={'Pending approvals'} img={pending} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'140'} text={'Approved request'} img={approved} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'20'} text={'Rejected request'} img={rejected} />
          </Grid>
        </Grid>

        <HeadCard sx={{ width: '100%', mt: '16px' }}>
          <Stack sx={{ width: '100%' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Stack width={'100%'} direction="row" alignItems="center" justifyContent={'space-between'} spacing={4}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>All Balance</Typography>
              <Grid item md={3} component="form">
                <Stack>
                  <InputLabel sx={{ color: 'text.secondary' }}>Search receipts</InputLabel>
                  <GeneralInput
                    fullWidth
                    placeholder="Enter search word"
                    name="search"
                    sx={{ width: '100%', mb: 0, display: 'flex', justifyContent: 'center' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" type="submit">
                            <Iconify icon={'eva:search-fill'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    // onChange={(e) => setKeyword(e.target.value)}
                  />
                </Stack>
              </Grid>

              <Grid item md={3}>
                <Stack>
                  <InputLabel sx={{ color: 'text.secondary' }}>Filter report</InputLabel>
                  <GeneralInput
                    sx={{
                      width: '12rem',
                      mb: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: '#F2F7FF',
                    }}
                    select
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="">All</option>

                    {React.Children.toArray(
                      ['description', 'date', 'amount', 'status']?.map((option) => (
                        <option value={option}>{option}</option>
                      ))
                    )}
                  </GeneralInput>
                </Stack>
              </Grid>

              <Grid item md={3}>
                <Button
                  //   onClick={onClick}
                  sx={{
                    color: 'white',
                    background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                    py: 1.5,
                    px: 5,
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Stack>

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
                  {tableData?.map((data, key) => (
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
                        {data?.description}
                      </TableCell>
                      <TableCell
                        style={{
                          minWidth: 80,
                        }}
                      >
                        {data?.date}
                      </TableCell>

                      <TableCell
                        style={{
                          minWidth: 80,
                        }}
                      >
                        {data?.amount}
                      </TableCell>

                      <TableCell
                        style={{
                          minWidth: 80,
                        }}
                      >
                        {data?.attachment}
                      </TableCell>
                      <TableCell
                        style={{
                          minWidth: 80,
                        }}
                      >
                        {data?.status.toLowerCase() === 'pending' ? (
                          <Pending> {data?.status} </Pending>
                        ) : data?.status.toLowerCase() === 'approved' ? (
                          <Success>{data?.status} </Success>
                        ) : (
                          <Failed>{data?.status}</Failed>
                        )}
                      </TableCell>

                      <TableCell
                        style={{
                          minWidth: 80,
                        }}
                        onClick={() => {
                          navigate(`/dashboard/approvals-details/1`);
                        }}
                      >
                        <Action>View More</Action>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </HeadCard>
      </Wrapper>
    </>
  );
}

export default Approvals;
