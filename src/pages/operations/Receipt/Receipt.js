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
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import Icon from '../../../assets/icons/Invoice.svg';
import { FormCard, Wrapper, Title, HeadCard, GeneralInput, Action } from '../../../styles/main';
import { getAllReceipts } from '../../../redux/actions/ReceiptsAction';
import { capitalize } from '../../../utils/formatNumber';
import { getAllStaffs } from '../../../redux/actions/StaffAction';
import { TablePagination } from '../../../utils/memoPaginationUtil';

function Receipt() {
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

  const { receipts, loading } = useSelector((state) => state.receipt);
  const { staffs } = useSelector((state) => state.staff);

  console.log(receipts);

  const [searchValue, setSearchValue] = useState('');
  const handleFormChange = ({ name, value }) => {
    setSearchValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getName = (id) => {
    const filterStaff = staffs?.filter((staff) => staff?._id === id);

    return (
      <p>
        {capitalize(filterStaff[0]?.firstName ? filterStaff[0]?.firstName : '-')}{' '}
        {capitalize(filterStaff[0]?.lastName ? filterStaff[0]?.lastName : '-')}
      </p>
    );
  };

  const tableHead = ['S/N', 'Subject', 'Date', 'Client', 'Paid By', 'Action'];

  useEffect(() => {
    dispatch(getAllReceipts());
    dispatch(getAllStaffs());
  }, []);
  return (
    <>
      <Helmet>
        <title>Receipts | Minimal UI</title>
      </Helmet>
      <Wrapper>
        <DashboardHeader title={'Receipts'} text={'View all Receipts'} icon={Icon} />

        <HeadCard>
          <Stack direction={'row'} spacing={25}>
            <Stack spacing={2}>
              <Typography variant="h4">{receipts?.total}</Typography>
              <Typography variant="p">Total client receipts</Typography>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="p">Search receipts</Typography>

              <Stack direction={'row'} spacing={4}>
                <GeneralInput
                  variant="outlined"
                  placeholder="Enter search word"
                  name=""
                  onChange={(e) => handleFormChange(e.target)}
                />
                <Grid item md={3}>
                  <Button
                    // onClick={onClick}
                    sx={{
                      color: 'white',
                      background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                      py: 1.5,
                      px: 8,
                      height: '55px',
                    }}
                  >
                    Search
                  </Button>
                </Grid>
              </Stack>
            </Stack>
          </Stack>
        </HeadCard>

        <HeadCard sx={{ width: '100%', mt: '16px' }}>
          <Stack sx={{ width: '100%' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>All Receipts</Typography>

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
            ) : receipts?.receipts?.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: '2rem',
                }}
              >
                <p>No receipts</p>
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
                      {receipts?.receipts?.map((data, key) => (
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
                            {getName(data?.clientId)}
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
                            <Action>View more</Action>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack sx={{ my: 5 }}>
                  <TablePagination
                    paginationPage={paginationPage}
                    total={receipts?.receipts?.length}
                    handleChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                  />
                </Stack>
              </>
            )}
          </Stack>
        </HeadCard>
      </Wrapper>
    </>
  );
}

export default Receipt;
