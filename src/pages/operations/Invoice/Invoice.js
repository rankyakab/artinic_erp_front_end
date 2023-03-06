import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  tableCellClasses,
  Table,
  Stack,
  CircularProgress,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import DashIconOne from '../../../assets/images/invoice-dash-one.png';
import DashIconTwo from '../../../assets/images/invoice-dash-two.png';
import DashIconThree from '../../../assets/images/invoice-dash-three.png';
import DashIconFour from '../../../assets/images/invoice-dash-four.png';

import Icon from '../../../assets/icons/Invoice.svg';
import AppWidgetSummary from '../../../sections/dashboard/AppWidgetSummary';
import { useSettingsContext } from '../../../components/settings';
import { FormCard, Wrapper, Title, HeadCard, Action } from '../../../styles/main';
import { getAllInvoices } from '../../../redux/actions/InvoiceAction';
import { getAllStaffs } from '../../../redux/actions/StaffAction';
import { capitalize } from '../../../utils/formatNumber';
import { TablePagination } from '../../../utils/memoPaginationUtil';

const Invoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(13);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const { invoices, loading } = useSelector((state) => state.invoice);
  const { staffs } = useSelector((state) => state.staff);

  const [totalCostIncurred, setTotalCostIncurred] = useState(0);

  console.log(invoices);

  const getName = (id) => {
    const filterStaff = staffs?.filter((staff) => staff?._id === id);

    return (
      <p>
        {capitalize(filterStaff[0]?.firstName ? filterStaff[0]?.firstName : '-')}{' '}
        {capitalize(filterStaff[0]?.lastName ? filterStaff[0]?.lastName : '-')}
      </p>
    );
  };

  //

  const totalCost = () =>
    invoices?.reduce((prev, cur) => {
      setTotalCostIncurred(cur?.total + prev);
      return cur?.total + prev;
    }, 0);

  const tableHead = ['S/N', 'Subject', 'Date', 'Prepared By', 'Sent To', 'Action'];

  useEffect(() => {
    dispatch(getAllInvoices());
    dispatch(getAllStaffs());
  }, []);

  useEffect(() => {
    totalCost();
  }, [invoices]);

  console.log(totalCostIncurred);

  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Helmet>
        <title>Client Invoice | Minimal UI</title>
      </Helmet>
      <Wrapper>
        <DashboardHeader title={'Client Invoice'} text={'View all client’s invoices'} icon={Icon} />
        {/* <Container maxWidth={themeStretch ? false : 'xl'}> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title={'Total cost incurred'}
              percent={'20 more than last year'}
              total={totalCostIncurred}
              img={DashIconOne}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary title={'Pending invoice'} total={'50'} img={DashIconTwo} />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary title={'Approved invoice'} total={'140'} img={DashIconThree} />
          </Grid>
          <Grid item xs={12} md={3}>
            <AppWidgetSummary title={'Rejected invoice'} total={'20'} img={DashIconFour} />
          </Grid>
        </Grid>

        <HeadCard sx={{ width: '100%', mt: '16px' }}>
          <Stack sx={{ width: '100%' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>All Invoice</Typography>

              <p>
                Showing <span>{5}</span> per page
              </p>
              <Grid item md={3}>
                <Button
                  // onClick={onClick}
                  sx={{
                    color: 'white',
                    background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                    py: 1.5,
                    px: 5,
                  }}
                  onClick={() => navigate('/dashboard/generate-invoice')}
                >
                  Generate Invoice
                </Button>
              </Grid>
            </Grid>

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
            ) : invoices?.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: '2rem',
                }}
              >
                <p>No invoices</p>
              </Box>
            ) : (
              <>
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
                      {invoices?.map((data, key) => (
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
                            {data?.subject}
                          </TableCell>
                          <TableCell
                            style={{
                              minWidth: 80,
                            }}
                          >
                            {moment(data?.createdAt).format('L')}
                          </TableCell>

                          <TableCell
                            style={{
                              minWidth: 80,
                            }}
                          >
                            {getName(data?.createdBy)}
                          </TableCell>

                          <TableCell
                            style={{
                              minWidth: 80,
                            }}
                          >
                            {getName(data?.billTo)}
                          </TableCell>

                          <TableCell
                            style={{
                              minWidth: 80,
                            }}
                            onClick={() => {
                              navigate(`/dashboard/invoice-details/${data?._id}`);
                            }}
                          >
                            <Action>View More</Action>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack sx={{ my: 5 }}>
                  <TablePagination
                    paginationPage={paginationPage}
                    total={invoices?.length}
                    handleChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                  />
                </Stack>
              </>
            )}
          </Stack>
        </HeadCard>
        {/* </Container> */}
      </Wrapper>
    </>
  );
};

export default Invoice;
